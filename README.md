# 소개

개인, 범용 프로젝트 관리 시스템 입니다.

Currently runs with:

- Angular v7.2.0
- Electron v4.0.0
- Electron Builder v20.28.1

## 규칙
1. 의무적인 주석을 달지 않습니다.
2. 코드로 주석을 대체할 수 있도록 작성합니다.
3. 

## 시작하기

해당 레파지토리를 클론 :

``` bash
git clone https://github.com/esmoney/aims-client.git
```

종속성 설치 :

``` bash
npm install
```

yarn에서는 패키징 오류가 있습니다. npm을 사용 하세요.


angular-cli를 반드시 설치하세요.

``` bash
npm install -g @angular/cli
```

## 커멘드 명령어

|  명령어  |설명|
|--|--|
|`npm run ng:serve:web`| 브라우저모드로 실행 |
|`npm run build`| 앱 빌드, 빌드파일은 /dist 폴더에 생성됩니다. |
|`npm run build:prod`| Angular aot를 포함하여 빌드합니다. 빌드파일은 /dist 폴더에 생성됩니다. |
|`npm run electron:local`| 앱 빌드 후 일렉트론을 실행합니다.
|`npm run electron:linux`| 리눅스 환경의 앱을 생성합니다. |
|`npm run electron:windows`| 윈도우 환경의 앱을 생성합니다. |
|`npm run electron:mac`|  맥 환경의 앱을 생성합니다. 파일이름은 `.app`으로 생성됩니다. |

**해당 앱은 /dist폴더와 노드모듈이 포함되어야만 실행 가능합니다.**
