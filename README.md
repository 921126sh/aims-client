[![Travis Build Status][build-badge]][build]
[![Dependencies Status][dependencyci-badge]][dependencyci]
[![Make a pull request][prs-badge]][prs]
[![License](http://img.shields.io/badge/Licence-MIT-brightgreen.svg)](LICENSE.md)

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

Clone this repository locally :

``` bash
git clone https://github.com/maximegris/angular-electron.git
```

Install dependencies with npm :

``` bash
npm install
```

yarn에서는 패키징 오류가 있습니다. npm을 사용 하세요.


angular-cli를 반드시 설치하세요.

``` bash
npm install -g @angular/cli
```

## 커멘드 명령어

|Command|Description|
|--|--|
|`npm run ng:serve:web`| Execute the app in the browser |
|`npm run build`| Build the app. Your built files are in the /dist folder. |
|`npm run build:prod`| Build the app with Angular aot. Your built files are in the /dist folder. |
|`npm run electron:local`| Builds your application and start electron
|`npm run electron:linux`| Builds your application and creates an app consumable on linux system |
|`npm run electron:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run electron:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

**해당 앱은 /dist폴더와 노드모듈이 포함되어야만 실행 가능합니다.**
