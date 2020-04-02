pipeline {
	agent none
	stages {
		stage('build and push image') {
			agent any
			steps {
			  notifyBuild(currentBuild.result)
				sh 'make build_image'
				withCredentials([usernamePassword(credentialsId: 'mody-docker-credentials', passwordVariable: 'password', usernameVariable: 'username')]) {
          sh 'docker login -u $username -p $password'
        }
        sh 'make push_image'
			}
		}
	}
	post {
        always {
            notifyBuild(currentBuild.result)
        }
    }
}

def notifyBuild(String buildStatus = 'STARTED') {
  buildStatus =  buildStatus ?: 'STARTED'
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject}: \n"
  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
    summary = summary + "The pipeline is started"
  } else if (buildStatus == 'SUCCESS') {
    color = 'GREEN'
    colorCode = '#00FF00'
    summary = summary + "The image is successfuly build et pused"
  } else {
    color = 'RED'
    colorCode = '#FF0000'
    summary = summary + "The pipeline is failed: image not builded"
  }
  slackSend baseUrl: 'https://hooks.slack.com/services/', channel: 'force-covid-19-frontend', color: colorCode, message: summary, teamDomain: 'force-covid-19-frontend', tokenCredentialId: 'slack-forcecovid19'
}

