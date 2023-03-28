※ 모바일 웹 소스 반영시 주의사항

1. application.yml에 profiles active 확인
 - dev(개발), real(운영)

2. 개발, 운영 소스가 다른 페이지가 있으니 주석 확인해서 반영
 - cookiemanager.js, download.html

3. 운영 WAS에 업로드시 앱 폴더 삭제 주의
 - /usr/local/tomcat/webapps/ROOT/file - 이 폴더 항상 통째로 백업 후 반영, 폴더 날라가면 앱 다운로드 안되고 앱 실행도 안될수도 있음.


※ 앱 빌드, 업로드시에 주의사항

1. 개발, 운영 앱 설치 파일 모두 운영 WAS에 업로드 되어 있음
 /usr/local/tomcat/webapps/ROOT/file/dev/ios		-> DEV ios
 /usr/local/tomcat/webapps/ROOT/file/dev/android 	-> DEV android
 /usr/local/tomcat/webapps/ROOT/file/ios		    -> REAL ios
 /usr/local/tomcat/webapps/ROOT/file/android		-> REAL android

- 안드로이드 앱 빌드시에는 위의 폴더에 json파일 열어서 versionName, versionCode 숫자 한개씩 올려서 빌드해야함.
ex > versionCode가 현재 2이면 3으로 versionName이 1.1이면 1.2로 안드로이드 소스에서 올린 다음 apk로 빌드를 한다. 
그러면 apk파일과 json파일이 생성이 되는데 이름을 위의 폴더에 있는 파일명대로 바꿔주고 같은 폴더에 업로드 하면 됨.
 
 ios앱 빌드시에는 위 폴더에 plist파일을 열어서 bundle-version을 확인 후 숫자 한개 올려서 빌드해야한다.
ex > bundle-version이 현재 1.2 이면 1.3으로 올린다음 ipa파일로 빌드를 한다.
생성된 ipa와 plist파일을 위 폴더의 이름대로 바꿔서 같은 폴더에 업로드 하면 됨. 

※ 기존 앱과 숫자가 동일하거나 낮으면 앱 자동업데이트가 실행되지 않으니 주의