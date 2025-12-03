pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/TanyaMCherry/todo-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t todoapp .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    bat 'echo %PASS% | docker login -u %USER% --password-stdin'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                bat 'docker tag todoapp tanyacherry123/todoapp:latest'
                bat 'docker push tanyacherry123/todoapp:latest'
            }
        }

        stage('Deploy App') {
            steps {
                bat 'docker stop todoapp-container || echo "container not running"'
                bat 'docker rm todoapp-container || echo "container not found"'
                bat 'docker run -d -p 8080:80 --name todoapp-container tanyacherry123/todoapp:latest'
            }
        }
    }
}
