import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css");
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    font-family: 'Pretendard-Regular', sans-serif;
    line-height: 1;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none !important;
    }
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
  button{
    background: inherit ;
    border:none;
    box-shadow:none;
    border-radius:0;
    padding:0;
    overflow:visible;
    cursor:pointer
  }
  * {
    box-sizing: inherit;
  }

.fc {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  border: none;
  width: 1100px;
}

.fc th,
.fc td {
  padding: 0;
  vertical-align: top;
  border-right: none;
  border-bottom: none;
}

.fc th {
  border-bottom: 1px solid ${(props) => props.theme.colors.gray[1]};
  border-radius: 1rem 1rem 0 0;
  text-align: center;
  padding: 0.3rem 0;
}

.fc-event {
  background-color: transparent;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
}
.fc-theme-standard .fc-scrollgrid {
  border: 1px solid ${(props) => props.theme.colors.gray[1]};
  border-radius: 1rem;
}
`;
export default GlobalStyle;
