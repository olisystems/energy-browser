pipeline {

    parameters {
        choice(name: 'NAMESPACE', description: 'k8s cluster you want to deploy to', choices: ['move-dev', 'move-int', 'move-prod'])
        choice(name: 'SLACK_USER', description: 'slack user', choices: ['Mauro', 'Sahithi', 'Yahya'])
    }

    environment {
        DOCKER_REGISTRY = "${env.DOCKER_REG_NAME}"
        DOCKER_REGISTRY_CRED_ID = "${env.DOCKER_REGISTRY_CRED_ID}"
        K8S_CLUSTER = "${env.DOSE_K8S_CLUSTER}"
        K8S_CLUSTER_CRED_ID = "${env.DOSE_K8S_CLUSTER_CRED_ID}"
        NAME = "energy-browser"
        GIT_COMMIT_SHORT = sh(script: "printf \$(git rev-parse --short ${GIT_COMMIT})", returnStdout: true)
        docker_tag = "${DOCKER_REGISTRY}${params.NAMESPACE}:${NAME}-${GIT_COMMIT_SHORT}"
    }

    agent any

    stages {

        stage('Install Dependencies') {
            environment {
                scannerHome = tool 'SonarQubeScanner-4.6.2'
            }

            steps {
                script {
                    sh 'cd app && rm -rf node_modules && npm cache clean --force && npm install'
                    sh "cd app && npm run build"

                    try {
                        withSonarQubeEnv('sonarqube-9.1') {
                            sh 'echo "${scannerHome}"'
                            sh "${scannerHome}/bin/sonar-scanner"
                        }
                    } catch (Exception e) {
                        error "Maybe sonar-project.properties is missing?"
                    }
                    stash name: 'build', includes: 'app/dist/'
                }
            }
        }

        stage('Build with Kaniko') {

            agent {
                kubernetes {
                    yaml """
                    kind: Pod
                    spec:
                      containers:
                      - name: kaniko
                        image: gcr.io/kaniko-project/executor:debug
                        imagePullPolicy: Always
                        command:
                        - sleep
                        args:
                        - 9999999
                        tty: true
                        volumeMounts:
                          - name: jenkins-docker-cfg
                            mountPath: /kaniko/.docker
                      volumes:
                      - name: jenkins-docker-cfg
                        projected:
                          sources:
                          - secret:
                              name: default-secret
                              items:
                                - key: .dockerconfigjson
                                  path: config.json
                    """
                }
            }


            steps {
                container(name: 'kaniko', shell: '/busybox/sh') {
                    unstash 'build'
                    withCredentials(bindings: [usernamePassword(credentialsId: DOCKER_REGISTRY_CRED_ID,
                        usernameVariable: 'DOCKER_REGISTRY_USERNAME', passwordVariable: 'DOCKER_REGISTRY_PASSWORD')]) {
                            sh '''#!/busybox/sh
                            - echo "{\"auths\":{\"swr.eu-de.otc.t-systems.com\":{\"auth\":\"$(printf "%s:%s" "${DOCKER_REGISTRY_USERNAME}" "${DOCKER_REGISTRY_PASSWORD}" | base64 | tr -d '\n')\"}}}" > /kaniko/.docker/config.json
                            /kaniko/executor --context `pwd` --dockerfile ./docker/Dockerfile  --destination "${docker_tag}"
                            '''
                    }
                }
            }
        }


        stage('Deploy branch artifact to the cluster') {

            when {
                not {
                    branch 'master'
                }
            }

            steps {
                withKubeConfig([credentialsId: "${K8S_CLUSTER_CRED_ID}", serverUrl: "${K8S_CLUSTER}"]) {
                    script {
                        def myMap = ['Mauro': 'U019T7V20TD', 'Sahithi': 'U0229AHAWCC', 'Yahya': 'U93B340P3']
                        def slackId = myMap.
                        "${params.SLACK_USER}"
                        try {
                            sh "helm upgrade --install ${NAME}-deployment --namespace ${params.NAMESPACE} --set docker.img.tag=${GIT_COMMIT_SHORT} --values=./kubernetes/values/${params.NAMESPACE}.yaml --history-max=1 --wait --timeout 600s ./kubernetes"
                            slackSend(color: "#008000", message: "The branch deployment for the new ${NAME} was successful.", channel: "@${slackId}")
                        } catch (Exception e) {
                            slackSend(color: "#7d0707", message: "The new ${NAME}-deployment of branch ${BRANCH_NAME} is not working", channel: "@${slackId}")
                            error "Could not deploy branch artifact for ${NAME}"
                        }

                    }
                }
            }
        }

        stage('Deploy master artifact to the cluster') {

            when {
                branch 'master'
            }

            steps {
                withKubeConfig([credentialsId: "${K8S_CLUSTER_CRED_ID}", serverUrl: "${K8S_CLUSTER}"]) {
                    script {
                        try {
                            sh "helm upgrade --install ${NAME}-deployment --namespace ${params.NAMESPACE} --set docker.img.tag=${GIT_COMMIT_SHORT} --values=./kubernetes/values/${params.NAMESPACE}.yaml --history-max=1 --wait --timeout 600s ./kubernetes"
                            slackSend(color: "#008000", message: "Deployed ${NAME}-deployment.\
                              \nThe master branch is deployable!\
                              \nLord Vader und Mauro mag das!")
                        } catch (Exception e) {
                            slackSend(color: "#7d0707", message: "You brought shame on your ${NAME}-deployment.\
                            \nThe master branch is not deployable!\
                            \nPlease fix it or Lord Vader will be very, very sad!")
                            error "Could not deploy master artifact for ${NAME}"
                        }


                    }
                }
            }
        }
    }

    post {
        always {
            sh "cd app && rm -rf node_modules"
            cleanWs()
        }
    }
}
