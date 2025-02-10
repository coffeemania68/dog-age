// breeds.js
const dogBreeds = {
    "그레이트 데인": { 
        lifespan: "8-10", 
        ageRate: 8.0, 
        image: "https://blog.kakaocdn.net/dn/ptllI/btsLhM2tSKj/aeMMk6g8Wgi46nV6kgllIk/img.png", 
        stats: { exercise: 7, grooming: 4, training: 6, health: 5, social: 7 }, 
        characteristics: "거대하지만 온순한 성격의 대형견입니다.", 
        healthNote: "고관절 이형성증과 심장병에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 30분의 가벼운 운동이 적당합니다.", 
        blogUrl: "/great-dane-care" 
    },
    "그레이하운드": { 
        lifespan: "10-13", 
        ageRate: 7.3, 
        image: "https://wrtn-image-user-output.s3.ap-northeast-2.amazonaws.com/648758005bfa0c92543455b6/79e3d1c6-fd25-4ab1-9088-cf983c63dc1c.png", 
        stats: { exercise: 8, grooming: 3, training: 5, health: 7, social: 6 }, 
        characteristics: "빠른 속도와 우아한 체형을 가진 견종입니다.", 
        healthNote: "치아 관리와 운동 후 휴식이 중요합니다.", 
        walkingTip: "하루 2회, 각 30-40분의 운동이 필요합니다.", 
        blogUrl: "/greyhound-care" 
    },
    "골든 리트리버": { 
        lifespan: "10-12", 
        ageRate: 7.5, 
        image: "https://blog.kakaocdn.net/dn/MIGgR/btsLgo9BEpx/4KhKzagp75umESsc8ftHbk/img.webp", 
        stats: { exercise: 7, grooming: 7, training: 3, health: 6, social: 9 }, 
        characteristics: "친근하고 지능적인 대표적인 가정견입니다.", 
        healthNote: "고관절 이형성증과 피부병에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 30-40분의 운동이 필요합니다.", 
        blogUrl: "/golden-retriever-care" 
    },
    "닥스훈트": { 
        lifespan: "12-16", 
        ageRate: 5.8, 
        image: "https://blog.kakaocdn.net/dn/nUGSb/btsLhvsX6I9/pbjjCLdftTfN6PikCnlk0k/img.png", 
        stats: { exercise: 5, grooming: 4, training: 5, health: 6, social: 7 }, 
        characteristics: "용감하고 영리한 성격의 견종입니다.", 
        healthNote: "척추 질환과 비만에 특히 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 15-20분의 가벼운 산책이 적당합니다.", 
        blogUrl: "/dachshund-care" 
    },
    "달마시안": { 
        lifespan: "10-13", 
        ageRate: 7.0, 
        image: "https://blog.kakaocdn.net/dn/cEUimy/btsLg8ZfhJQ/VjkdeqXwFNaocM6qsGOyuk/img.png", 
        stats: { exercise: 8, grooming: 4, training: 5, health: 6, social: 7 }, 
        characteristics: "활동적이고 지구력이 뛰어난 견종입니다.", 
        healthNote: "청각 문제와 요로 결석에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 30-40분의 운동이 필요합니다.", 
        blogUrl: "/dalmatian-care" 
    },
    "도베르만": { 
        lifespan: "10-13", 
        ageRate: 7.8, 
        image: "https://blog.kakaocdn.net/dn/zQtk9/btsLhN8akJS/msmLk7BJXroigUDtvwlaL1/img.png", 
        stats: { exercise: 8, grooming: 4, training: 4, health: 6, social: 6 }, 
        characteristics: "충성심이 강하고 지능적인 견종입니다.", 
        healthNote: "심장병과 척추 질환에 주의가 필요합니다.", 
        walkingTip: "하루 2-3회, 각 30-40분의 운동이 필요합니다.", 
        blogUrl: "/doberman-care" 
    },
    "래브라도 리트리버": { 
        lifespan: "10-12", 
        ageRate: 7.5, 
        image: "https://blog.kakaocdn.net/dn/P0kr8/btsLh2qsj4g/hYM3lcUlFbN1KcBOPEgxTK/img.webp", 
        stats: { exercise: 7, grooming: 5, training: 3, health: 6, social: 9 }, 
        characteristics: "친근하고 활발한 성격의 대표적인 가정견입니다.", 
        healthNote: "고관절 이형성증과 비만에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 30-40분의 운동이 필요합니다.", 
        blogUrl: "/labrador-retriever-care" 
    },
    "로트와일러": { 
        lifespan: "8-10", 
        ageRate: 7.8, 
        image: "https://blog.kakaocdn.net/dn/dC2T8x/btsLgpAxF2l/nbFZeBv0bAo2kkDbqI4Mo1/img.png", 
        stats: { exercise: 7, grooming: 4, training: 4, health: 5, social: 6 }, 
        characteristics: "충성심이 강하고 용감한 견종입니다.", 
        healthNote: "고관절 이형성증과 심장병에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 30분의 운동이 필요합니다.", 
        blogUrl: "/rottweiler-care" 
    },
    "말티즈": { 
        lifespan: "12-15", 
        ageRate: 5.5, 
        image: "https://blog.kakaocdn.net/dn/bgpC5F/btsLgeMOmdl/yms2UKIoJqbZ5FkdtRhTKk/img.png", 
        stats: { exercise: 4, grooming: 9, training: 5, health: 6, social: 8 }, 
        characteristics: "애교가 많고 영리한 반려견입니다.", 
        healthNote: "치아 관리와 눈물자국 관리가 중요합니다.", 
        walkingTip: "하루 2회, 각 15-20분의 가벼운 산책이 적당합니다.", 
        blogUrl: "/maltese-care" 
    },
    "미니어처 슈나우저": { 
        lifespan: "12-14", 
        ageRate: 5.8, 
        image: "https://blog.kakaocdn.net/dn/LgcCv/btsLfHvd4Zu/JLl99w2b3SzDb4GvzxPLiK/img.png", 
        stats: { exercise: 6, grooming: 8, training: 4, health: 7, social: 7 }, 
        characteristics: "영리하고 충성심이 강한 견종입니다.", 
        healthNote: "췌장염과 당뇨병에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 20-30분의 산책이 적당합니다.", 
        blogUrl: "/miniature-schnauzer-care" 
    },
    "미니어처 핀셔": { 
        lifespan: "12-16", 
        ageRate: 5.8, 
        image: "https://blog.kakaocdn.net/dn/pbgLh/btsLgrrA4lC/vScRDN08eRI4lrOiXjMaDk/img.png", 
        stats: { exercise: 6, grooming: 3, training: 5, health: 7, social: 6 }, 
        characteristics: "영리하고 활발한 소형견입니다.", 
        healthNote: "슬개골 탈구와 치아 관리에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 20분의 산책이 적당합니다.", 
        blogUrl: "/miniature-pinscher-care" 
    },
    "벨지언 말리노이즈": { 
        lifespan: "10-12", 
        ageRate: 7.5, 
        image: "https://blog.kakaocdn.net/dn/PwJcx/btsLhoU4rSa/tlliKTzmCLLP0tuIZII0E0/img.png", 
        stats: { exercise: 9, grooming: 5, training: 3, health: 7, social: 6 }, 
        characteristics: "지능적이고 운동능력이 뛰어난 견종입니다.", 
        healthNote: "고관절 이형성증과 눈 질환에 주의가 필요합니다.", 
        walkingTip: "하루 2-3회, 각 40분 이상의 운동이 필요합니다.", 
        blogUrl: "/belgian-malinois-care" 
    },
    "버니즈 마운틴 독": { 
        lifespan: "6-8", 
        ageRate: 8.0, 
        image: "https://blog.kakaocdn.net/dn/caFMc3/btsLhrjW6cp/jv8gLI2P9rKmbGzTUJKoKk/img.png", 
        stats: { exercise: 7, grooming: 8, training: 4, health: 4, social: 8 }, 
        characteristics: "온순하고 충성심이 강한 대형견입니다.", 
        healthNote: "고관절 이형성증과 암 발병률에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 30분의 가벼운 운동이 적당합니다.", 
        blogUrl: "/bernese-mountain-dog-care" 
    },
    "베들링턴 테리어": { 
        lifespan: "12-14", 
        ageRate: 6.5, 
        image: "https://blog.kakaocdn.net/dn/WMekY/btsLhMnQe3M/bpONLtKqMx0RszkjQ7Mbxk/img.jpg", 
        stats: { exercise: 7, grooming: 8, training: 5, health: 6, social: 7 }, 
        characteristics: "양과 비슷한 외모를 가진 온순한 테리어입니다.", 
        healthNote: "구리 축적증과 눈 질환에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 20-30분의 산책이 적당합니다.", 
        blogUrl: "/bedlington-terrier-care" 
    },
    "비글": { 
        lifespan: "12-15", 
        ageRate: 6.8, 
        image: "https://blog.kakaocdn.net/dn/GTkaL/btsLgDrYM2r/VExDiYuIkeuU3TnNm4s611/img.png", 
        stats: { exercise: 8, grooming: 4, training: 6, health: 7, social: 9 }, 
        characteristics: "활발하고 친근한 성격의 사냥견입니다.", 
        healthNote: "비만과 귀 감염에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 30분의 운동이 필요합니다.", 
        blogUrl: "/beagle-care" 
    },
    "비숑 프리제": { 
        lifespan: "12-15", 
        ageRate: 6.0, 
        image: "https://blog.kakaocdn.net/dn/blA3zY/btsLhMnQSBI/0EhGkL0Tmwrca0hK4eGQwk/img.png", 
        stats: { exercise: 5, grooming: 9, training: 4, health: 7, social: 9 }, 
        characteristics: "명랑하고 애교가 많은 견종입니다.", 
        healthNote: "피부 알레르기와 눈물자국 관리가 필요합니다.", 
        walkingTip: "하루 2회, 각 20분의 가벼운 산책이 적당합니다.", 
        blogUrl: "/bichon-frise-care" 
    },
    "사모예드": { 
        lifespan: "12-14", 
        ageRate: 7.0, 
        image: "https://blog.kakaocdn.net/dn/bx8kdS/btsLgacwt6B/X939KuoDXfMD5eDkFCxp4K/img.png", 
        stats: { exercise: 7, grooming: 8, training: 5, health: 6, social: 8 }, 
        characteristics: "친근하고 활발한 북방견입니다.", 
        healthNote: "고관절 이형성증과 눈 질환에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 30-40분의 운동이 필요합니다.", 
        blogUrl: "/samoyed-care" 
    },
    "세인트 버나드": { 
        lifespan: "8-10", 
        ageRate: 8.0, 
        image: "https://blog.kakaocdn.net/dn/2N7zD/btsLfV0Y4AC/nSl1v1s7FP4Sea81yPn1Bk/img.png", 
        stats: { exercise: 5, grooming: 7, training: 5, health: 4, social: 8 }, 
        characteristics: "거대하지만 온순하고 인내심이 많은 견종입니다.", 
        healthNote: "고관절 이형성증과 심장병에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 20-30분의 가벼운 운동이 적당합니다.", 
        blogUrl: "/saint-bernard-care" 
    },
    "시바 이누": { 
        lifespan: "12-15", 
        ageRate: 6.8, 
        image: "https://blog.kakaocdn.net/dn/czas8G/btsLhhof8zM/lT83kmDv7wRzspRfIOcc6k/img.png", 
        stats: { exercise: 6, grooming: 5, training: 6, health: 7, social: 5 }, 
        characteristics: "독립적이고 영리한 일본의 대표 견종입니다.", 
        healthNote: "알레르기와 눈 질환에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 30분의 산책이 적당합니다.", 
        blogUrl: "/shiba-inu-care" 
    },
    "시베리안 허스키": { 
        lifespan: "12-14", 
        ageRate: 7.3, 
        image: "https://blog.kakaocdn.net/dn/c7biXT/btsLgtwaPyD/FTy9zbzKXz8DzTJr8olgKK/img.png", 
        stats: { exercise: 9, grooming: 6, training: 6, health: 7, social: 8 }, 
        characteristics: "활동적이고 독립심이 강한 북방견입니다.", 
        healthNote: "눈 질환과 고관절 이형성증에 주의가 필요합니다.", 
        walkingTip: "하루 2-3회, 각 40분 이상의 운동이 필요합니다.", 
        blogUrl: "/siberian-husky-care" 
    },
    "시츄": { 
        lifespan: "10-18", 
        ageRate: 5.8, 
        image: "https://blog.kakaocdn.net/dn/bqVKHx/btsLhNVxWNM/9KqkYZw0KQ9K1NKHKkv3K/img.png", 
        stats: { exercise: 4, grooming: 9, training: 5, health: 6, social: 8 }, 
        characteristics: "친근하고 애교가 많은 반려견입니다.", 
        healthNote: "눈 질환과 호흡기 문제에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 15-20분의 가벼운 산책이 적당합니다.", 
        blogUrl: "/shih-tzu-care" 
    },
    "알래스칸 맬러뮤트": { 
        lifespan: "10-12", 
        ageRate: 7.5, 
        image: "https://blog.kakaocdn.net/dn/E07kd/btsLg8EWhmy/tA9wEYOPethcl2JQkX45wk/img.png", 
        stats: { exercise: 9, grooming: 7, training: 6, health: 6, social: 7 }, 
        characteristics: "힘이 세고 지구력이 뛰어난 북방견입니다.", 
        healthNote: "고관절 이형성증과 눈 질환에 주의가 필요합니다.", 
        walkingTip: "하루 2-3회, 각 40분 이상의 운동이 필요합니다.", 
        blogUrl: "/alaskan-malamute-care" 
    },
    "올드 잉글리시 쉽독": { 
        lifespan: "10-12", 
        ageRate: 7.5, 
        image: "https://blog.kakaocdn.net/dn/cgslX0/btsLf1GNAeH/Vu9KAT9rJyiUsFWtMaanWK/img.png", 
        stats: { exercise: 6, grooming: 9, training: 4, health: 6, social: 8 }, 
        characteristics: "온순하고 지능적인 대형 견종입니다.", 
        healthNote: "고관절 이형성증과 피부 감염에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 30분의 가벼운 운동이 적당합니다.", 
        blogUrl: "/old-english-sheepdog-care" 
    },

    "웰시 코기": { 
        lifespan: "12-14", 
        ageRate: 6.8, 
        image: "https://blog.kakaocdn.net/dn/bhaiqu/btsLgZBuz32/8b7PB4dvkXaUlQKkN1X2u1/img.png", 
        stats: { exercise: 7, grooming: 6, training: 4, health: 6, social: 8 }, 
        characteristics: "영리하고 활발한 성격의 견종입니다.", 
        healthNote: "척추 질환과 비만에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 20-30분의 산책이 적당합니다.", 
        blogUrl: "/welsh-corgi-care" 
    },
  "요크셔 테리어": { 
        lifespan: "13-16", 
        ageRate: 5.5, 
        image: "https://mypawstory.com/wp-content/uploads/2024/12/%EA%B0%95%EC%95%84%EC%A7%80-%EB%B0%9C%EC%9E%91-%EC%98%88%EB%B0%A9-300x300.jpg", 
        stats: { exercise: 5, grooming: 8, training: 5, health: 6, social: 7 }, 
        characteristics: "작지만 용감하고 활기찬 반려견입니다.", 
        healthNote: "치아 관리와 슬개골 탈구에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 15-20분의 가벼운 산책이 적당합니다." 
    },
    "잉글리시 세터": { 
        lifespan: "11-12", 
        ageRate: 7.3, 
        image: "https://blog.kakaocdn.net/dn/dvn1Ax/btsLhw6wOT5/zzcHwk1gePJijPzI634uWk/img.png", 
        stats: { exercise: 8, grooming: 7, training: 5, health: 6, social: 8 }, 
        characteristics: "우아하고 친근한 성격의 사냥견입니다.", 
        healthNote: "고관절 이형성증과 귀 감염에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 30-40분의 운동이 필요합니다.", 
        blogUrl: "/english-setter-care" 
    },
    "저먼 셰퍼드": { 
        lifespan: "9-13", 
        ageRate: 7.8, 
        image: "https://blog.kakaocdn.net/dn/W3MGC/btsLgelIgVg/WX2XlBuJk9y8OpHVkrp8ok/img.webp", 
        stats: { exercise: 8, grooming: 6, training: 3, health: 5, social: 6 }, 
        characteristics: "지능적이고 충성심이 강한 견종입니다.", 
        healthNote: "고관절 이형성증과 척추 질환에 주의가 필요합니다.", 
        walkingTip: "하루 2-3회, 각 30-40분의 운동이 필요합니다.", 
        blogUrl: "/german-shepherd-care" 
    },
    "진돗개": { 
        lifespan: "12-15", 
        ageRate: 7.0, 
        image: "https://blog.kakaocdn.net/dn/rE2S0/btsLhpzGcmv/chcY4jxgfLwosZW4e9utqK/img.png", 
        stats: { exercise: 7, grooming: 4, training: 5, health: 8, social: 6 }, 
        characteristics: "충성심이 강하고 용맹한 한국의 대표 견종입니다.", 
        healthNote: "고관절 이형성증과 피부병에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 30-40분의 운동이 필요합니다.", 
        blogUrl: "/jindo-dog-care" 
    },
    "차우차우": { 
        lifespan: "9-15", 
        ageRate: 7.0, 
        image: "https://wrtn-image-user-output.s3.ap-northeast-2.amazonaws.com/648758005bfa0c92543455b6/90085425-59fe-43f2-b557-55eeed2cd584.png", 
        stats: { exercise: 5, grooming: 8, training: 6, health: 5, social: 5 }, 
        characteristics: "독립적이고 충성심이 강한 견종입니다.", 
        healthNote: "고관절 이형성증과 눈 질환에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 20-30분의 산책이 적당합니다.", 
        blogUrl: "/chow-chow-care" 
    },
    "치와와": { 
        lifespan: "12-20", 
        ageRate: 5.5, 
        image: "https://blog.kakaocdn.net/dn/meHzl/btsLf104jcv/s2D8nrldg1QTDX1MwO6Ay0/img.png", 
        stats: { exercise: 4, grooming: 5, training: 5, health: 6, social: 7 }, 
        characteristics: "작지만 용감하고 활발한 성격입니다.", 
        healthNote: "슬개골 탈구와 치아 관리에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 15-20분의 가벼운 산책이 적당합니다.", 
        blogUrl: "/chihuahua-care" 
    },
    "토이 푸들": { 
        lifespan: "12-15", 
        ageRate: 5.8, 
        image: "https://blog.kakaocdn.net/dn/chzgig/btsLgDrZfGY/0opxKCJVwZpppS5kFP7nM1/img.png", 
        stats: { exercise: 5, grooming: 9, training: 3, health: 7, social: 8 }, 
        characteristics: "영리하고 애교가 많은 반려견입니다.", 
        healthNote: "슬개골 탈구와 눈 질환에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 20분의 가벼운 산책이 적당합니다.", 
        blogUrl: "/toy-poodle-care" 
    },
    "페키니즈": { 
        lifespan: "12-14", 
        ageRate: 5.8, 
        image: "https://blog.kakaocdn.net/dn/bkNs2q/btsLf1UmNt3/mL1PbSsue7Vzvqvx9s1sWk/img.jpg", 
        stats: { exercise: 3, grooming: 8, training: 6, health: 5, social: 6 }, 
        characteristics: "당당하고 독립적인 성격의 견종입니다.", 
        healthNote: "호흡기 문제와 눈 질환에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 15분의 가벼운 산책이 적당합니다.", 
        blogUrl: "/pekingese-care" 
    },
    "포메라니안": { 
        lifespan: "12-16", 
        ageRate: 6.0, 
        image: "https://blog.kakaocdn.net/dn/7Pbo5/btsLgacwVg7/vHvdnvki5tSVU9W7BIkZhK/img.jpg", 
        stats: { exercise: 4, grooming: 8, training: 5, health: 6, social: 7 }, 
        characteristics: "활발하고 영리한 작은 견종입니다.", 
        healthNote: "슬개골 탈구와 치아 관리에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 15-20분의 가벼운 산책이 적당합니다.", 
        blogUrl: "/pomeranian-care" 
    },
    "프렌치 불독": { 
        lifespan: "10-12", 
        ageRate: 7.0, 
        image: "https://blog.kakaocdn.net/dn/pTYoD/btsLg4WXWBV/RUEdIKLXKu5y70213IHJ4k/img.png", 
        stats: { exercise: 5, grooming: 3, training: 5, health: 4, social: 8 }, 
        characteristics: "친근하고 장난스러운 성격의 견종입니다.", 
        healthNote: "호흡기 문제와 척추 질환에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 15-20분의 가벼운 산책이 적당합니다.", 
        blogUrl: "/french-bulldog-care" 
    },
    "웨스트 하이랜드 화이트 테리어": { 
        lifespan: "12-16", 
        ageRate: 5.8, 
        image: "https://mypawstory.com/wp-content/uploads/2024/12/%EB%B0%98%EB%A0%A4%EA%B2%AC-%EC%88%98%EB%91%90%EC%A6%9D-%EA%B4%80%EB%A6%AC-%EA%B0%80%EC%9D%B4%EB%93%9C-233x300.jpg", 
        stats: { exercise: 6, grooming: 7, training: 5, health: 6, social: 7 }, 
        characteristics: "친근하고 활발한 소형 테리어입니다.", 
        healthNote: "피부 질환과 알레르기에 주의가 필요합니다.", 
        walkingTip: "하루 2회, 각 20-30분 산책이 적당합니다." 
    }

export default dogBreeds;

