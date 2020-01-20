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
  const [buttonState, setButtonState] = React.useState('view');
  const [leftOpen, setLeftOpen] = React.useState(true);
  const [rightOpen, setRightOpen] = React.useState(true);
  const [bottomOpen, setBottomOpen] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      onWindowResize();
    }, TRANSITION_SPEED);
  }, [buttonState]);

  return (
    <Container>
      <div style={{padding: 16, display: 'flex', justifyContent: 'center', position: 'absolute', color: 'white', width: '100%', textAlign: 'center'}}>
      <button onClick={() => setButtonState('view')} style={{background: buttonState==='view' ? 'pink' : 'white'}}>View</button>
      <button onClick={() => setButtonState('edit')} style={{background: buttonState==='edit' ? 'pink' : 'white'}}>Edit</button>
      <button onClick={() => setButtonState('studio')} style={{background: buttonState==='studio' ? 'pink' : 'white'}}>Studio</button>
      </div>
      <GridContainer>
        <LeftColumn
          anchorSide="left"
          minSize={320}
          open={buttonState === 'studio' && leftOpen}
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
          minSize={200}
          open={buttonState === 'studio' && bottomOpen}
          onChangeOpen={(open) => { setBottomOpen(open) }}
          onIsDraggingChange={onWindowResize}
        >
          <div>Bottom Row</div>
        </BottomRow>
        </CenterColumn>
        <RightColumn
          anchorSide="right"
          minSize={320}
          open={buttonState === 'studio' && rightOpen}
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
