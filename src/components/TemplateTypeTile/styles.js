import { css } from "@emotion/react";

const styles = (theme, props) => {
  const tile = css`
    border-radius: 20px;
    width: ${props.width ? props.width : "100%"};
    height: ${props.height ? props.height : "100%"};
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
    position: relative;
    zindex: 1;
    background: inherit;
    overflow: hidden;
    &:before {
      position: absolute;
      background: inherit;
      z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
      filter: blur(30px);
      margin: -20px;
    }
  `;

  const tileClicked = css`
    padding: 1.5em;
    background: #ffffff;
    box-shadow: 0px 0px 0px 1px rgba(20, 46, 110, 0.1);

    border-radius: 20px;
    width: ${props.width ? props.width : "100%"};
    height: ${props.height ? props.height : "100%"};
  `;

  const tileContent = css`
    padding: 1.5em 1.5em 0 1.5em;
    flex-direction: column;
    height: 100%;
    width: 100%;
  `;

  const tileHeader = css`
    flex: 0;
  `;

  const templateTitle = css`
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: ${props.textAlign ? props.textAlign : "left"};
  `;

  const templateDescription = css`
    font-size: 1rem;
    font-weight: none;
    margin-bottom: 5rem;
  `;

  const tileBody = css`
    flex: 1;
    flex-direction: row;
    background-attachment: fixed;
    background-size: cover;
    display: grid;
    height: 15vh;
    width: 60vh;
    background-color: ${props.color ? props.color : "#bed754"};
  `;

  return {
    tile,
    tileClicked,
    tileContent,
    tileHeader,
    templateTitle,
    templateDescription,
    tileBody,
  };
};
export default styles;
