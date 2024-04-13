import { css } from "@emotion/react";
import styled from "@emotion/styled";

interface AcceptedFiles {
  extensions: string[];
  type: string;
}
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${({ width, disabled }: {
    width?: string;
    disabled?: boolean;
  }) => css`
    width: ${width ? width : "100%"};
    pointer-events: ${disabled ? "none" : "auto"};
  `}
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: row;
  ${({ value, width, height, acceptedFiles }: {
    value?: File | File[] | null;
    width?: string;
    height?: string;
    acceptedFiles?: AcceptedFiles
  
  }) => css`
    border: ${value
      ? acceptedFiles
        ? `1px solid #2C98A0`
        : `1px solid #EA3232`
      : `2px dashed #9E9E9E`};
    width: ${width ? width : "100%"};
    height: ${height ? height : "100%"};
  `}
  border-radius: 6px;
  align-items: center;
  padding: 5px;
  z-index: 1;
`;
