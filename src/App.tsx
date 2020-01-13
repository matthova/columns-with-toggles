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
  grid-template-columns: min-content 1fr min-content;
  grid-template-rows: 1fr min-content;
  background: black;
  grid-gap: 3px;
`;

interface FarLeftColumnProps {
  readonly open: boolean;
}

const LeftColumn = styled(ResizeOrHide)`
  background: #FFAAAA;
  grid-area: 1 / 1 / 3 / 2;
`;

const RightColumn = styled(ResizeOrHide)`
  background: #AAFFAA;
  grid-area: 1 / 3 / 3 / 4;
`;

const BottomRow = styled(ResizeOrHide)`
  background: #AAAAFF;
  grid-area: 2 / 2 / 3 / 3;
`

const Canvas = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  background: #AAAAAA;
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
          minSize={320}
          open={allOpen && leftOpen}
          onChangeOpen={(open) => { setLeftOpen(open) }}
        >
          <div>Left Column</div>
        </LeftColumn>
        <Canvas>
          Canvas
        </Canvas>
        <RightColumn
          anchorSide="right"
          minSize={320}
          open={allOpen && rightOpen}
          onChangeOpen={(open) => { setRightOpen(open) }}
        >
          <div>Right Column</div>
        </RightColumn>
        <BottomRow
          anchorSide="bottom"
          minSize={320}
          open={allOpen && bottomOpen}
          onChangeOpen={(open) => { setBottomOpen(open) }}
        >
          <div>Bottom Row</div>
        </BottomRow>
      </GridContainer>
    </Container>
  );
}




export default App;
