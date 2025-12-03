pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/TanyaMCherry/todo-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t todoapp .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "echo $PASS | docker login -u $USER --password-stdin"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'docker tag todoapp tanyacherry123/todoapp:latest'
                sh 'docker push tanyacherry123/todoapp:latest'
            }
        }

        stage('Deploy App') {
            steps {
                sh 'docker stop todoapp-container || true'
                sh 'docker rm todoapp-container || true'
                sh 'docker run -d -p 8080:80 --name todoapp-container tanyacherry123/todoapp:latest'
            }
        }
    }
}
