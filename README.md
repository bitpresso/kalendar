
일정을 관리하는 Calendar 웹 어플리케이션 구현

- [프로젝트 빌드 및 실행 방법](GettingStarted.md)
- [기능 요구사항](Requirements.md)

# 문제 해결 전략

## Server
빠른 개발을 위해 Spring Boot + Spring Data REST + Embedded H2 database 선정

- 기본 CRUD endpoint는 Spring Data REST를 통해 제공
- 일정 entity는 간단하게 title, start, end로 구성
- 날짜/시간 기준은
  - UTC 기준으로 Database에 저장
  - API 요청으로 송수신되는 날짜/시간 역시 UTC
  - Frontend에서 Local 날짜/시간으로 변환하여 사용
- 기간(start, end)를 기준으로 일정을 리스팅하여 반환하는 API 추가 (월/주 캘린더에 표시)

[Server API Spec.](server/README.md)

## WebApp
과제 요구사항을 만족하는 vue 컴포넌트(`kalendar`)를 독립적으로 구성하고 이를 vuejs 프로젝트에서 사용하는 방식으로 설계

### Kalendar (webapp/kalendar)
- vuejs로 구현된 캘린더 컴포넌트
  - 차후 npm 패키지로 구성할 수 있도록 소스 트리 구성
  - 외부 라이브러리에 대한 의존성 없이 사용할 수 있도록 설계
  - toolbar, header, content 컴포넌트로 구성
  - 기본 테마 스타일(styles/default.css) 지원
    - 프로젝트에 import 하여 사용하거나,
    - 프로젝트에 복사 후 수정하여 스타일링
  - vuejs의 slot을 이용하여 header, content 영역의 출력 포맷 변경 지원
  - 초기 options 설정에 따라 toolbar 사용 여부, 일정 데이터의 필드 매핑 지원
    - 기본 toolbar 대신 사용자가 구현한 toolbar를 사용할 수 있도록 컴포넌트의 데이터 및 이벤트 전달 채널 오픈
    - 필드 매핑을 통해 서버에서 가져오는 일정 데이터를 변환없이 사용 가능
  - 캘린더를 구성하고 날짜 관련 헬퍼 메소드를 제공하는 Calendar 클래스 제공
    - 현재 선택된 날짜를 기준으로 월/주 캘린더를 구성할 Date 오브젝트들을 생성 및 관리
    - 월 이동, 주 이동, 날짜 변환 등의 헬퍼 메소드 제공
    - javascript의 Date 클래스를 기본 날짜 데이터로 사용
      - 사용자의 지역을 기반으로 날짜, 출력 포맷 사용 가능

[Kalendar Spec.](webapp/kalendar/README.md)

# 회고
* momentjs를 사용했으면 더 쉬웠을텐데...
* CSS의 Grid 레이아웃이 원하는 방식의 동작을 지원하지 않아서 아쉽다.
