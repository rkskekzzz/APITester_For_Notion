# APITester_For_Notion

APITester_For_Notion은 API 문서를 Notion으로 작성할 때, Notion 내에서 Embeding Block으로 사용할 수 있는 오픈소스 입니다.

# Demo

[Demo Link](https://heyinsa.kr/apitester/?method=get&url=test&body=undefined&header=undefined)

# Feature

# Usage

| props  | optional? | default | value?                                                                                                                                             |
| ------ | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode   | optional  | light   | 기본값은 라이트모드, mode 옵션을 통해서 APITester Block의 기본 테마를 지정할 수 있습니다.                                                          |
| method | optional  | get     | 특정 API에서 사용하는 HTTP메소드를 APITester Block의 기본 메서드로 지정할 수 있습니다. 메서드가 설정되어 있지 않다면 Send버튼이 동작하지 않습니다. |
| url    | -         | -       | 테스트를 진행하고 싶은 API를 입력합니다, URL이 입력되지 않으면 Send 버튼이 동작하지 않습니다.                                                      |
| body   | optional  | -       | body로 넘길 json형식의 문자열을 입력합니다.                                                                                                        |
| header | optional  | -       | header로 넘길 key=value형식의 문자열을 입력합니다.                                                                                                 |

# Example

# Keywords
