## **목차**

- [Naming Convention](#naming-convention)
  - [Commit Convention](#commit-convention)
  - [Branch Naming Convention](#branch-naming-convention)
  - [Issues Naming Convention](#issues-naming-convention)
  - [Pull Request Naming Convention](#pull-request-naming-convention)
  - [File Naming Convention](#file-naming-convention)
    - [app](#app)
    - [components](#components)
    - [features](#features)
    - [hooks, quires](#hooks-quires)
    - [lib](#lib)
    - [pages, types](#etc-types)
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

### **app**

- 이 폴더에 해당하는 파일들은 `Next.js`의 App Router 파일 명명 규칙에 따릅니다.

<br />

### **components**

- 이 폴더에는 프로젝트 전반적으로 공통되게 사용되는 컴포넌트들을 모아놓은 폴더입니다. 해당하는 파일들은 **파스칼 케이스**로 작명합니다.
  - ex)
    - `ContentTextBox`

<br />

### **features**

- 이 폴더는 도메인별 상태 관리(redux)를 위한 파일을 모아놓은 폴더입니다. **케밥 케이스**를 이용하며, 아래와 같이 작명합니다.
  - auth 도메인
    - ex)
      - `auth/auth.slice.ts`
      - `auth/auth.saga.ts`

<br />

### **hooks, quires**

- 이 폴더에는 프로젝트에서 사용되는 Custom hook 들을 모아놓은 폴더입니다. 해당하는 파일들은 접두사로 `use` 를 사용하고, **카멜 케이스**로 작명합니다.
  - ex)
    - `useSomeAction`
    - `useSharedPostQuery`

<br />

### **lib**

- 이 폴더는 일부 예외가 발생할 수 있습니다. 대체로, 이 폴더에 있는 파일은 라이브러리 설정을 위한 파일들로 해당 파일의 성격에 따라 이름을 작명합니다.
  - ex)
    - redux store를 리액트 애플리케이션 전반에 제공되기 위해 사용되는 Provider `StoreProvider`
    - 그에 따른 type checking을 지원하는 함수 제공을 위한 `store.ts`

<br />

### **etc. (types, ...)**

- 위에 언급한 폴더를 제외한 폴더에 작성되는 파일들은 모두 **케밥 케이스**로 작명합니다.
  - ex) `user.ts`, `user-profile.ts`

<br /> <br />

## Package Manager

- 현재 패키지 매니저로는 `yarn` 을 사용하고 있습니다.
