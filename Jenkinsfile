pipeline {
    agent any
    
    environment {
        // Set environment variables here (if needed)
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        SERVER_SSH_CREDENTIALS = credentials('cloud-ssh-id')
        SERVER_USER = 'root'
        SERVER_IP = '34.152.7.19'
        SERVER_DESTINATION_FOLDER = '/docker/lab/deployed'
	    SSH_KEY=''
        APP_NAME = 'sdetracker' // Replace with your Node.js app name
        DOCKER_IMAGE_TAG = 'latest' // You can use version numbers as well
        DOCKER_IMAGE_REPO = 'hanisntsolo/sdetracker-be' // Replace with your Docker Hub repository name
    }
    
    stages {
        stage('Build Node.js Application') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Build Docker Image') {
                steps {
                    // Build the Docker image using the Dockerfile in your project directory
                    sh "docker build -t $IMAGE_NAME ."
                }
            }
        stage('Publish to Docker Hub') {
            steps {
                script {
                    // Authenticate with Docker Hub using the provided credentials
                    docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                        // Push the Docker image to Docker Hub
                        sh "docker push $IMAGE_NAME"
                    }
                }
            }
        }
        stage('Deploy to Server') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'cloud-ssh-id', keyFileVariable: 'SSH_KEY')]) {
                        sh "ssh -i $SSH_KEY $SERVER_USER@$SERVER_IP 'docker stop sdetracker-be || true && docker rm sdetracker-be|| true'"
                        sh "ssh -i $SSH_KEY $SERVER_USER@$SERVER_IP 'docker run -d -p 8088:8088 --name sdetracker-be $IMAGE_NAME'"
                    }
                }
            }
        }
    }
}
