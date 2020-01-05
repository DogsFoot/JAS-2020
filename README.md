# JAS-2020
2020 NEW!

## folder
```
/ practice
  ㄴ dropdown / README.md ( 과제 가이드 )
    ㄴ c11g
    ㄴ yeoyeo3
    ㄴ rodwn

/ README.md
```

* [dropdown](https://github.com/DogsFoot/JAS-2020/tree/dropdown/practice/dropdown)

### 프로젝트 관리
이왕 PR을 통한 코드리뷰를 하는 김에, 깃헙내에 프로젝트랑 마일스톤 기능도 적극 써보려고 해요.  
저는 실무에서 잘 사용하지 않아서 정확히는 어떤 용도인지 잘 모르겠어요.(잘 아시는 분이 있으면 이끌어주시면 될거 같아요)  
이번에 공부도 해볼 겸 활용해보려고 합니다. 잘 모르는 기능들이라 활용성이 떨어질 수 도 있어요.  

프로젝트는 2개 병행합니다.
- BOOK REVIEW: 책 읽고 정리
- PRACTICE: 매 주 내는 실습 과제

마일스톤은 실제 스터디가 이루어지는 날을 기준으로 잡았습니다.(보통 1주 단위 예상)
- Sprint 01 ~ 99

### 작업 방식
모든 작업은 이슈로 등록하고 진행하는 것을 원칙으로 합니다.

`이슈 등록 -> 작업 진행 -> PR -> MERGE`

> 책 정리는 WIKI나 외부툴을 이용하셔도 되기 때문에 이슈까지만 등록 후, PR -> MERGE 단계는 없을 수도 있습니다.
> 정리가 완료되면 산출물 경로만 공유주시고 이슈 닫아주세요.

### 브랜치 전략
1. 과제 담당자가 기준 브랜치를 생성하고, 해당 브랜치에서 개인 브랜치를 생성 후, 정해진 폴더에 과제를 진행하시면 됩니다.
2. 각자 작업이 완료되면 기준 브랜치로 PR, 멤버 전원인 @ALL 로 리뷰어를 지정해주세요.  
3. 리뷰어의 approve 이후에 MERGE를 해주세요!  
4. 모든 멤버가 작업이 끝나고, 해당 스터디가 지나면 기준 브랜치를 master로 merge 후 관련 브랜치 삭제

**주의) 1+ approve 일때만 MERGE가 되도록 옵션을 줬는데, 멤버 전원이 admin 권한이라 approve 없이도 MERGE가 됩니다**

### 작업 흐름 dropdown 예(1 Sprint 기준)
1. 과제 준비 단계
  - 담당자가 "dropdown 과제 스펙 정리" 이슈를 생성(마일스톤은 다음 약속된 Sprint 00로 지정, 프로젝트는 Practice로 지정)
  - 이 시점에는 프로젝트의 Todo 단계
2. 과제 스펙 정리 단계
  - "dropdown 과제 스펙 정리"의 단계를 In progress로 이동
  - 기준 브랜치 dropdown 생성 후 원격에 푸쉬
  - 과제 스펙을 정리, 스펙 정리는 dropdown 브랜치에서 진행하며, /dropdown/readme.md 파일에 작성
  - 정리가 완료되면 PR -> MERGE
3. 과제 진행 단계
  - 멤버 개인별로 이슈를 생성("조영광 dropdown 과제") : Todo 단계
  - 개인 브랜치 생성 후 작업 진행 : In progress 단계
  - 작업 완료 후 dropdown으로 PR -> 리뷰 -> approve -> MERGE
  - MERGE가 되면 개인이 생성한 이슈를 각자 Close
4. 실제 스터디에서 관련 이슈 정리 및 다음 담당자 지정
5. 위 Sprint를 반복
