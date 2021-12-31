# APITester_For_Notion

APITester_For_Notion은 API 문서를 Notion으로 작성할 때, Notion 내에서 Embeding Block으로 사용할 수 있는 오픈소스 입니다.

</br>
</br>

# Demo

아래 링크에서 Demo 버전을 사용해 보세요!

[Demo Link](https://heyinsa.kr/apitester/?method=get&url=test&body=undefined&header=undefined)

</br>
</br>

# Feature

- Notion등 Embeding Block이 사용가능한 서비스 에서 사용가능 합니다.
- QueryString을 사용해서 포멧이 적용된 블록을 다양하게 생성할 수 있습니다.
- 오픈소스 라이브러리 입니다.

</br>
</br>

# Usage

| props  | optional? | default | value?                                                                                                                                                                                  |
| ------ | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode   | optional  | light   | 기본값은 라이트모드, mode 옵션을 통해서 APITester Block의 기본 테마를 지정할 수 있습니다.                                                                                               |
| method | optional  | get     | 특정 API에서 사용하는 HTTP메소드를 APITester Block의 기본 메서드로 지정할 수 있습니다. 메서드가 설정되어 있지 않다면 Send버튼이 동작하지 않습니다. get, post, put, delete를 제공합니다. |
| url    | -         | -       | 테스트를 진행하고 싶은 API를 입력합니다, URL이 입력되지 않으면 Send 버튼이 동작하지 않습니다.                                                                                           |
| body   | optional  | -       | body로 넘길 json형식의 문자열을 입력합니다.                                                                                                                                             |
| header | optional  | -       | header로 넘길 key=value형식의 문자열을 입력합니다.                                                                                                                                      |

</br>
</br>

# Example

아래 iframe 코드의 src 부분에 넣을 url을 변경해서 원하는 형태의 블록을 생성할 수 있습니다.
적용가능한 Props들을 활용하면 정해진 폼의 블록이 성생됩니다.

```html
<iframe
  src="여기에 URL을 넣어주세요"
  style="border:0px #ffffff none;"
  name="APITester"
  scrolling="no"
  frameborder="1"
  marginheight="0px"
  marginwidth="0px"
  height="100%"
  width="600%"
  allowfullscreen
></iframe>
```

## URL을 만드는 방법

iframe의 src에 넣을 url을 생성하는 방법입니다.

### Method

```text
https://heyinsa.kr/apitester/?method=get
https://heyinsa.kr/apitester/?method=post
```

### URL

```
https://heyinsa.kr/apitester/?url=your_api_url
```

### Theme

```
https://heyinsa.kr/apitester/?mode=dark
https://heyinsa.kr/apitester/?mode=light
```

### Multy Query

```
https://heyinsa.kr/apitester/?mode=dark&method=get&url=your_api_url&header={"key":"valye"}
```

</br>
</br>

# Keywords

- API
- React
- Notion
