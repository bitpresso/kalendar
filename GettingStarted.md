# 프로젝트 빌드 및 실행 방법

## 실행 환경
* Java 1.8
* Lombok v1.18.2
* NodeJs 8.11.1
* NPM 5.6.0

## 저장소 다운로드
```bash
$ git clone https://github.com/bitpresso/kalendar.git
$ cd kalendar
$ export PROJDIR=$PWD
```

## 서버 빌드 및 실행
```bash
$ cd $PROJDIR/server

# gradle wrapper를 사용하여 실행
$ ./gradlew bootrun

# jar 파일 생성 후 실행
$ ./gradlew bootjar
$ java -jar build/lib/kalendar-0.0.1-SNAPSHOT.jar

## 실행 시 다음 라인에서 포트가 8088인지 확인
...
...[  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8088 (http) with context path ''
[  restartedMain] c.g.b.kalendar.server.ServerApplication  : Started ServerApplication in 14.394 seconds (JVM running for 16.654)
```

`8088 포트`를 사용할 수 없는 상황이라면,
1. `$PROJDIR/server/src/main/resources/application.yml` 파일의 `server.port` 값을 변경
2. `$PROJDIR/webapp/src/main.js` 파일에서 포트 번호 부분 변경
```javascript
Vue.use(services, {
  baseURL: `${window.location.protocol}//${window.location.hostname}:8088/api`,
});
```

## 웹앱 빌드 및 실행
```bash
$ cd $PROJDIR/webapp

# 의존성 패키지 설치
$ npm install

# 개발 서버를 통해 확인
$ npm run serve
...
  App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.1.57:8080/
## 출력된 주소 중 하나를 선택하여 브라우저로 접속
```
