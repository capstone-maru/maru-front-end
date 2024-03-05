## Commit Convention

- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 포맷팅
- refactor: 코드 리팩토링
- test: 테스트 코드
- chore: 빌드 업무 수정, 패키지 매니저 수정
- comment: 주석 추가 및 수정

커밋할 때 헤더에 위 내용을 작성하고 전반적인 내용을 간단하게 작성합니다. 또는 이슈로 등록이 되어있다면 이슈 번호를 함께 작성합니다.

### 예시

```bash
git commit -m "feat: add some function (#1)"

git commit -m "commit-type: [message] [issue number]
```

## Branch Naming Convention

특정 기능을 위한 브랜치를 새롭게 만들 때, 브랜치 이름은 항상 위 Commit Convention의 Header와 함께 작성되어야 합니다.

특정 기능을 위한 브랜치가 아닌 무언가를 하기 위한 브랜치라면, 의미를 잘 표현할 수 있는 이름으로 작성합니다.

### 예시

```plaintext
feat/...

refactor/...
```

## File Naming Convention

### Components, Models

이 폴더에 해당하는 파일들은 **파스칼 케이스**로 작명합니다.

ex) `ContentTextBox`, `ChattingGroup`

### Hooks

이 폴더에 해당하는 파일들을 접두사로 `use` 를 사용하고, **카멜 케이스**로 작명합니다.

ex) `useSomeAction`

### lib

이 폴더는 일부 예외가 발생할 수 있습니다. 대체로, 이 폴더에 있는 파일은 라이브러리 설정을 위한 파일들로 해당 파일의 성격에 따라 이름을 작명합니다.

ex) 컴포넌트처럼 사용되는 Provider `StoreProvider`, 일부 함수 제공을 위한 `store.ts`


### etc.

이 폴더에 해당하는 파일들은 **케밥 케이스**로 작명합니다.

ex) `auth-service`, `profile-service`


## Package Manager

현재 패키지 매니저로는 `yarn` 을 사용하고 있습니다.
