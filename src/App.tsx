import React from 'react';
import styled from 'styled-components';
import { Resizable } from 're-resizable';

const Container = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 1px solid red;
`;

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid blue;
  display: flex;
`

const FarLeftColumn = styled.div`
  width: 50px;
  min-width: 50px;
  background: pink;
  position: relative;
  z-index: 1;
`;

interface LeftColumnProps {
  readonly isDragging: boolean;
  readonly ref: HTMLElement;
}
const LeftColumn = styled(Resizable)<LeftColumnProps>`
  transition: ${p => p.isDragging ? 'none' : 'width 300ms'};;
`

interface LeftColumnContentProps {
  readonly width: number;
  readonly open: boolean;
  readonly isDragging: boolean;
}

const setLeft = (props: LeftColumnContentProps) => {
  const left = props.width < 200 ? -200 : props.open ? 0: -props.width;
  return left;
}

const LeftColumnContent = styled.div.attrs((props: LeftColumnContentProps) => ({
  style: {
    width: `${props.width}px`,
    left: `${setLeft(props)}px`,
  },
}))<LeftColumnContentProps>`
  min-width: 200px;
  position: absolute;
  transition: ${p => p.isDragging ? 'none' : 'left 300ms'};;
`

const CenterColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  > div {
    border: 1px solid pink;
  }
`

const RightColumn = styled(Resizable)`
  width: 200px;
`

const Canvas = styled.div`
  flex: 1;
`

const BottomRow = styled(Resizable)`
  height: 200px;
`

const App: React.FC = () => {
  const [leftColumnWidth, setLeftColumnWidth] = React.useState(200);
  const [leftColumnOpen, setLeftColumnOpen] = React.useState(true);
  const [isDragging, setIsDragging] = React.useState(false);
  const leftColumnRef = React.useRef(null) as any;

  return (
    <Container>
      <GridContainer>
        <FarLeftColumn />
        <LeftColumn
          enable={{ right: true }}
          ref={leftColumnRef}
          size={{
            width: leftColumnOpen ? leftColumnWidth : 0,
            height: 'auto'
          }}
          onResizeStart={() => {
            setLeftColumnOpen(true);
            setIsDragging(true);
          }}
          snap={leftColumnWidth <= 200 ? { x: [0, 200, 201]} : undefined}
          onResize={(e: any, two, three, four) => {
            if (leftColumnRef.current) {
              const newWidth = leftColumnRef.current.resizable.getBoundingClientRect().width;
              if (newWidth < 200 && newWidth > 0) {
                setLeftColumnWidth(200);
              } else {
                setLeftColumnWidth(newWidth);
              }
            }
          }}
          onResizeStop={(e, direction, ref, d) => {
            setIsDragging(false);
            if (leftColumnWidth === 0) {
              setLeftColumnOpen(false);
            }
          }}
          isDragging={isDragging}
        >
          <LeftColumnContent
            width={leftColumnWidth}
            open={leftColumnOpen}
            isDragging={isDragging}
          >
            Left Column {leftColumnWidth}px
          </LeftColumnContent>
        </LeftColumn>
        <CenterColumn>
          <Canvas>
            Canvas
            <button
              onClick={() => {
                setLeftColumnOpen(!leftColumnOpen);
                if (leftColumnWidth < 200) {
                  setLeftColumnWidth(200);
                }
              }}
            >
              Toggle Left Column
            </button>
          </Canvas>
          <BottomRow>Bottom Row</BottomRow>
        </CenterColumn>
        <RightColumn>Right Column</RightColumn>
      </GridContainer>
    </Container>
  );
}

export default App;
