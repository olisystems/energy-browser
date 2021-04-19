pipeline{
    
    agent any

    environment {
        DOCKER_REGISTRY = "${env.K8S_WS_MIGRATION_DOCKER_REG}"
        DOCKER_REGISTRY_CRED = "${env.K8S_DEV_DOCKER_REG_CRED_ID}"
        K8S_CLUSTER = "${env.DOSE_K8S_CLUSTER}"
        K8S_CLUSTER_CRED_ID = "${env.DOSE_K8S_CLUSTER_CRED_ID}"
        NAME = "energy-browser"
        GIT_COMMIT_SHORT = sh(script: "printf \$(git rev-parse --short ${GIT_COMMIT})", returnStdout: true)
        HOME = '.'
        NAMESPACE="ws-migration"
    }

    stages{

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'node'
                }
            }
            steps {
                sh 'cd app && npm install'
            }
        }
        
        stage('Build Stage') {
            agent {
                docker {
                    image 'node'
                }
            }
            steps {
                sh "cd app && npm run build"
                
            }
        }

        stage('Stash Build') {
            agent {
                docker {
                    image 'node'
                }
            }
            steps {
                stash name: 'build', includes: 'app/dist/'
            }
        }

        stage('Build Docker image') {
            steps {
                dir("dist") {
                    unstash "build"
                }

                sh "docker build -t ${DOCKER_REGISTRY}:${NAME}-${GIT_COMMIT_SHORT} -f ./docker/Dockerfile ."
            }
        }

        stage('Push Docker Image') {
            steps{
                withCredentials(bindings:[usernamePassword(credentialsId: DOCKER_REGISTRY_CRED,
                usernameVariable: 'DOCKER_REGISTRY_USERNAME', passwordVariable: 'DOCKER_REGISTRY_PASSWORD')]){
                    sh "docker login -u ${DOCKER_REGISTRY_USERNAME} -p ${DOCKER_REGISTRY_PASSWORD} ${DOCKER_REGISTRY}"
                    sh "docker push ${DOCKER_REGISTRY}:${NAME}-${GIT_COMMIT_SHORT}"
                }
            }
        }

        stage('Deploy to k8s') {
            steps{
                withKubeConfig([credentialsId: "${K8S_CLUSTER_CRED_ID}", serverUrl: "${K8S_CLUSTER}"]){
                    sh "helm upgrade --install ${NAME}-deployment ./kubernetes \
                    --values=./kubernetes/values/values.yaml \
                    --set docker.img.tag=${GIT_COMMIT_SHORT} --namespace=${NAMESPACE} \
                    --history-max=1 \
                    --wait --timeout 600s"
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