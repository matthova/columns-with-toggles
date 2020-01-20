import React from 'react';
import styled from 'styled-components';
import { ResizeOrHide, TRANSITION_SPEED } from './ResizeOrHide';
import { onWindowResize } from './geometries';

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const GridContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: black;
`;

interface FarLeftColumnProps {
  readonly open: boolean;
}

const LeftColumn = styled(ResizeOrHide)`
  background: #FFAAAA;
`;

const RightColumn = styled(ResizeOrHide)`
  background: #AAFFAA;
`;

const CenterColumn = styled('div')`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
`;

const BottomRow = styled(ResizeOrHide)`
  background: #AAAAFF;
`

const Canvas = styled.div`
  background: #AAAAAA;
  flex: 1 1 100%;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  > canvas {
    width: 100% !important;
    height: 100% !important;
  }
`


const App: React.FC = () => {
  const [allOpen, setAllOpen] = React.useState(false);
  const [leftOpen, setLeftOpen] = React.useState(true);
  const [rightOpen, setRightOpen] = React.useState(true);
  const [bottomOpen, setBottomOpen] = React.useState(true);

  React.useEffect(() => {
    const keydownListener = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        setAllOpen(!allOpen);
      }
    };

    setTimeout(() => {
      onWindowResize();
    }, TRANSITION_SPEED);

    document.addEventListener('keydown', keydownListener);
    return () => {
      document.removeEventListener('keydown', keydownListener);
    }
  }, [allOpen]);

  return (
    <Container>
      <GridContainer>
        <LeftColumn
          anchorSide="left"
          minSize={600}
          open={allOpen && leftOpen}
          onChangeOpen={(open) => { setLeftOpen(open) }}
          onIsDraggingChange={onWindowResize}
        >
          <div>Left Column</div>
        </LeftColumn>
        <CenterColumn>
        <Canvas id="react-canvas">
        </Canvas>
        <BottomRow
          anchorSide="bottom"
          minSize={320}
          open={allOpen && bottomOpen}
          onChangeOpen={(open) => { setBottomOpen(open) }}
          onIsDraggingChange={onWindowResize}
        >
          <div>Bottom Row</div>
        </BottomRow>
        </CenterColumn>
        <RightColumn
          anchorSide="right"
          minSize={320}
          open={allOpen && rightOpen}
          onChangeOpen={(open) => { setRightOpen(open) }}
          onIsDraggingChange={onWindowResize}
        >
          <div>Right Column</div>
        </RightColumn>
      </GridContainer>
    </Container>
  );
}

export default App;
