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

const LeftColumn = styled(ResizeOrHide)`
  background: #FFAAAA;
`;

const RightColumn = styled(ResizeOrHide)`
  background: #AAFFAA;
`;

const BottomRow = styled(ResizeOrHide)`
  background: #AAAAFF;
`

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`

const FarLeftColumn = styled.div`
  width: 120px;
  min-width: 120px;
  background: #FFFFAA;
  position: relative;
  z-index: 1;
`;


const CenterColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Canvas = styled.div`
  flex: 1;
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
        <CenterColumn>
          <Canvas>
            Canvas
          </Canvas>
          <BottomRow
            anchorSide="bottom"
            minSize={200}
            open={bottomOpen}
            onChangeOpen={(open) => { setBottomOpen(open) }}
          >
            <div>Bottom Row</div>
          </BottomRow>
        </CenterColumn>
        <RightColumn
          anchorSide="right"
          minSize={200}
          open={rightOpen}
          onChangeOpen={(open) => { setRightOpen(open) }}
        >
          <div>Right Column</div>
        </RightColumn>
      </GridContainer>
    </Container>
  );
}




export default App;
