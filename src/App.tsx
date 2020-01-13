import React from 'react';
import styled from 'styled-components';
import { ResizeOrHide } from './ResizeOrHide';

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 120px min-content 1fr min-content;
  grid-template-rows: 1fr min-content;
  background: black;
  grid-gap: 3px;
`;

const FarLeftColumn = styled.div`
  min-width: 120px;
  background: #FFFFAA;
  position: relative;
  z-index: 1;
  grid-area: 1 / 1 / 3 / 2;
`;

const LeftColumn = styled(ResizeOrHide)`
  background: #FFAAAA;
  grid-area: 1 / 2 / 3 / 3;
`;

const RightColumn = styled(ResizeOrHide)`
  background: #AAFFAA;
  grid-area: 1 / 4 / 3 / 5;
`;

const BottomRow = styled(ResizeOrHide)`
  background: #AAAAFF;
  grid-area: 2 / 3 / 3 / 4;
`

const Canvas = styled.div`
  grid-area: 1 / 3 / 2 / 4;
`


const App: React.FC = () => {
  const [leftOpen, setLeftOpen] = React.useState(true);
  const [rightOpen, setRightOpen] = React.useState(true);
  const [bottomOpen, setBottomOpen] = React.useState(true);

  return (
    <Container>
      <GridContainer>
        <FarLeftColumn>
          <div>
            <button
              onClick={() => {
                setLeftOpen(!leftOpen);
              }}
            >
              Toggle Left
              </button>
          </div>
          <div>
            <button
              onClick={() => {
                setRightOpen(!rightOpen);
              }}
            >
              Toggle Right
              </button>
          </div>
          <div>
            <button
              onClick={() => {
                setBottomOpen(!bottomOpen);
              }}
            >
              Toggle Bottom
              </button>
          </div>
        </FarLeftColumn>
        <LeftColumn
          anchorSide="left"
          minSize={200}
          open={leftOpen}
          onChangeOpen={(open) => { setLeftOpen(open) }}
        >
          <div>Left Column</div>
        </LeftColumn>
        <Canvas>
          Canvas
        </Canvas>
        <RightColumn
          anchorSide="right"
          minSize={200}
          open={rightOpen}
          onChangeOpen={(open) => { setRightOpen(open) }}
        >
          <div>Right Column</div>
        </RightColumn>
        <BottomRow
          anchorSide="bottom"
          minSize={200}
          open={bottomOpen}
          onChangeOpen={(open) => { setBottomOpen(open) }}
        >
          <div>Bottom Row</div>
        </BottomRow>
      </GridContainer>
    </Container>
  );
}




export default App;
