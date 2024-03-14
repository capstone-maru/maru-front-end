## **목차**

- [Naming Convention](#naming-convention)
  - [Commit Convention](#commit-convention)
  - [Branch Naming Convention](#branch-naming-convention)
  - [Issues Naming Convention](#issues-naming-convention)
  - [Pull Request Naming Convention](#pull-request-naming-convention)
  - [File Naming Convention](#file-naming-convention)
    - [app](#app)
    - [pages](#pages)
    - [components](#components)
    - [features](#features)
    - [entities](#entities)
    - [shared](#shared)
- [Package Manager](#package-manager)

<br /> <br />

# Naming Convention

## **Commit Convention**

- 커밋할 때 헤더에 아래 내용을 작성하고 전반적인 내용을 간단하게 작성합니다. 또는 이슈로 등록이 되어있다면 이슈 번호를 함께 작성합니다.

  - feat: 새로운 기능 추가
  - fix: 버그 수정
  - docs: 문서 수정
  - style: 코드 포맷팅
  - refactor: 코드 리팩토링
  - test: 테스트 코드
  - chore: 빌드 업무 수정, 패키지 매니저 수정
  - comment: 주석 추가 및 수정

### **예시**

```bash
git commit -m "feat: add some function (#1)"

git commit -m "commit-type: [message] [issue number]
```

<br /> <br />

## **Branch Naming Convention**

- 특정 기능을 위한 브랜치를 새롭게 만들 때, 브랜치 이름은 항상 위 Commit Convention의 Header와 함께 작성되어야 합니다.
- 특정 기능을 위한 브랜치가 아닌 무언가를 하기 위한 브랜치라면, 의미를 잘 표현할 수 있는 이름으로 작성합니다.

### **예시**

```plaintext
feat/...

refactor/...
```

<br /> <br />

## **Issues Naming Convention**

- 이슈를 만들 때 템플릿에 작성되어 있는 요령에 따라 작성합니다.
  - 현재 템플릿으로는 기능 추가 (feat), 버그 수정 (fix) 총 2가지의 템플릿이 있습니다.
  - 다른 이슈는 **Overview** 의 내용만 포함해서 작성합니다.
- 이슈 제목은 Commit Naming Convention 처럼 어떠한 유형인지 헤더에 같이 작성합니다.

### 예시

```plaintext
[feat]: add new function

[fix]: fix some bug
```

<br /> <br />

## **Pull Request Naming Convention**

- Pull Request 만들 때 템플릿에 따라 작성합니다.
- 제목은 아래와 같은 요령으로 작성합니다.

### 예시

```plaintext
feat: add new functions

fix: fix some bugs
```

<br /> <br />

## **File Naming Convention**

- 하기 내용은 폴더 별 파일 네이밍에 대한 규칙을 서술하고 있습니다. 파일 네이밍 규칙은 폴더의 성격에 따라 변경됩니다.

<br />

### app

- 이 폴더에서는 Next.js 라우팅 규칙에 따라 파일 이름을 명명합니다. 또한 내부의 pages, lib 폴더에서는 기본적으로 **케밥 케이스**를 이용하며, 컴포넌트의 경우 **카멜 케이스**를 사용합니다.

### pages

- pages 폴더는 Next.js 와 충돌을 피하기 위해 app 폴더 내에 위치해 있으며, 이 경우에는 **케밥 케이스**를 사용합니다.

### components

- components 폴더는 **카멜 케이스**를 사용합니다.

### features

- features 폴더는 **케밥 케이스**를 사용합니다

### entities

- entities 폴더는 **케밥 케이스**를 사용합니다.

### shared

- shared 폴더는 **케밥 케이스**를 사용합니다.

<br /> <br />

## Package Manager

- 현재 패키지 매니저로는 `yarn` 을 사용하고 있습니다.
