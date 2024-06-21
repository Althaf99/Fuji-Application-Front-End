import { css } from "@emotion/react";

const styles = (theme) => {
  const gridContainer = css`
    flex-direction: column;
    flex-wrap: nowrap;
  `;
  const headingTitle = css`
    font-family: Nunito !important;
    font-weight: 600 !important;
    font-style: normal !important;
    line-height: 41px !important;
    font-weight: 500;
    font-size: 25px !important;
    line-height: 48px;
    color: white;
  `;
  const helperTextSection = css`
    padding-top: 15px;
  `;
  const section = css`
    padding-top: 30px;
  `;

  const paper = css`
    border-radius: 8px;
    box-shadow: 0 0 0.5em 0 #bf3131;
    font-size: 5px;
    padding: 4px 15px 4px 15px;
    background-color: #bf3131;
    width: 100%;
  `;

  return {
    gridContainer,
    headingTitle,
    helperTextSection,
    section,
    paper,
  };
};

export default styles;
