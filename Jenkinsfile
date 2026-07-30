pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        S3_BUCKET = "jenkins-demo-bucket-ttn"
        CLOUDFRONT_DISTRIBUTION = "E5WACK2P183QF"
    }

    options {
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out source code..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm packages..."
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                echo "Running tests..."
                sh 'npm test -- --run'
            }
        }

        stage('Build') {
            steps {
                echo "Building React application..."
                sh 'npm run build'
            }
        }

        stage('Deploy to S3') {
            steps {
                echo "Syncing dist folder to S3..."

                sh """
                    aws s3 sync dist/ s3://${S3_BUCKET}/ \
                        --delete \
                        --region ${AWS_REGION}
                """
            }
        }

        stage('Invalidate CloudFront Cache') {
            steps {
                echo "Invalidating CloudFront cache..."

                sh """
                    aws cloudfront create-invalidation \
                        --distribution-id ${CLOUDFRONT_DISTRIBUTION} \
                        --paths "/*"
                """
            }
        }
    }

    post {
        success {
            echo '''
==========================================
 Deployment Completed Successfully!
 React application deployed to S3.
 CloudFront cache invalidated.
==========================================
'''
        }

        failure {
            echo '''
==========================================
 Deployment Failed!
 Check the Jenkins console output.
==========================================
'''
        }

        always {
            cleanWs()
        }
    }
}
