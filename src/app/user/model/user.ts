export class User {
    /**
     * 생성자이다.
     * 
     * @constructor
     * @param userId 사용자식별자
     * @param userNm 사용자명칭
     * @param userPw 사용자 패스워드
     * @param userIp 사용자 Ip
     * @param validExpDate 계정 만료일자
     * @param pwdChgDate 비밀번호 변경 일자
     * @param pwdExpiredRemainDay 비밀번호 만료 잔여일
     * @param userRoles 사용자 역할 목록
     */
    constructor(
        public userId: string,
        public userNm: string,
        public userPw: string,
        public userDiv: string
    ) { }

    /**
     * 객체를 생성하여 반환한다.
     * 
     * @param src 원시 객체 
     * @returns 생성된 객체
     */
    static create(src: User): User {
        let newObzect = new User(src.userId, src.userNm, src.userPw, src.userDiv);
        return newObzect;
    }
}