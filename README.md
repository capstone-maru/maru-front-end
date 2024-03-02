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

## Package Manager

현재 패키지 매니저로는 `yarn` 을 사용하고 있습니다.
