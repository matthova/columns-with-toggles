import React from 'react';
import styled from 'styled-components';
import { Resizable, ResizableProps } from 're-resizable';

export const TRANSITION_SPEED = 300;
export const TRANSITION_SPEED_STRING = `${TRANSITION_SPEED}ms`;

type Sides = 'left' | 'right' | 'top' | 'bottom';

interface ResizeOrHideProps extends ResizableProps {
  anchorSide: Sides;
  minSize: number;
  children: React.ReactNode;
  open: boolean;
  onChangeOpen: (open: boolean) => void;
  onIsDraggingChange?: () => void;
}

interface ContainerProps {
  readonly animated: 0 | 1;
  readonly ref: HTMLElement;
}

const Container = styled(Resizable) <ContainerProps>`
  transition: ${p => p.animated ? `width ${TRANSITION_SPEED_STRING}, height ${TRANSITION_SPEED_STRING}` : 'none'}
`;

interface ContentContainerProps {
  readonly anchorSide: Sides;
  readonly size: number;
  readonly minSize: number;
  readonly open: boolean;
}

const setSize = (props: ContentContainerProps) => {
  const size = props.size < props.minSize ? -props.minSize : props.open ? 0 : -props.size;
  return size;
}


const Filler = styled.div<{ size: number, isOpen: boolean }>`
  width: ${p => p.isOpen ? p.size : 0}px;
  transition: all ${TRANSITION_SPEED_STRING};
`;

const ContentContainer = styled.div.attrs((props: ContentContainerProps): any => ({
  style: {
    [props.anchorSide]: `${setSize(props)}px`,
    [['left', 'right'].includes(props.anchorSide) ? 'width' : 'height']: `${props.size}px`
  }
})) <ContentContainerProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: ${ p => p.isDragging ? 'none' : `${p.anchorSide} ${TRANSITION_SPEED_STRING}`};
  ${ p => `${['left', 'right'].includes(p.anchorSide) ? 'min-width' : 'min-height'}: ${p.minSize}px;`}
`

const getAnchorsOppositeSide = (anchor: Sides): Sides => {
  if (anchor === 'left') {
    return 'right';
  }
  if (anchor === 'right') {
    return 'left';
  }
  if (anchor === 'top') {
    return 'bottom';
  }
  return 'top';
}

export const ResizeOrHide = ({ anchorSide, children, minSize, open: openProp, onChangeOpen, onIsDraggingChange, ...rest }: ResizeOrHideProps) => {
  const [size, setSize] = React.useState(minSize);
  const [isDragging, setIsDragging] = React.useState(false);
  const [open, setOpen] = React.useState(openProp);
  const ref = React.useRef(null) as any;

  React.useEffect(() => {
    setOpen(openProp);
  }, [open, openProp]);

  React.useEffect(() => {
    if (onIsDraggingChange) {
      onIsDraggingChange();
    }
  }, [isDragging, onIsDraggingChange]);

  const sizeProp = ['left', 'right'].includes(anchorSide)
    ? { width: open ? size : 0, height: 'auto' }
    : { width: 'auto', height: open ? size : 0 }

  const snap = open && size > minSize
    ? undefined
    : { [['left', 'right'].includes(anchorSide) ? 'x' : 'y']: [0, minSize, minSize + 1] }

  return (
    <Container
      {...rest}
      animated={isDragging ? 0 : 1}
      enable={{ [getAnchorsOppositeSide(anchorSide)]: false }}
      ref={ref}
      size={sizeProp}
      snap={snap}
      onResize={() => {
        if (ref.current) {
          const newSize = ref.current.resizable.getBoundingClientRect()[['left', 'right'].includes(anchorSide) ? 'width' : 'height'];
          if (newSize === 0 && !open) {
            return;
          }
          setIsDragging(true);
          onChangeOpen(true);
          if (open && newSize < minSize && newSize > 0) {
            setSize(minSize);
          } else {
            setSize(newSize);
          }
        }
      }}
      onResizeStop={(event, direction, ref, dif) => {
        if (size === 0) {
          onChangeOpen(false);
          setSize(['left', 'right'].includes(anchorSide) ? -dif.width : -dif.height);
        }
        // I can't think of a clean way to watch for this.
        // We could use useEffect but the logic would be really messy
        // If we've dragged closed, we want to set the size to whatever it was when we started dragging
        // In order to prevent from animating this change we don't set isDragging to false until the next tick
        setTimeout(() => {
          setIsDragging(false);
        }, 0)
      }}
    // isDragging={isDragging}
    >
      <ContentContainer
        anchorSide={anchorSide}
        size={size}
        minSize={minSize}
        open={open}
        isDragging={isDragging}
      >
        {children}
      </ContentContainer>
      <Filler size={size} isOpen={open}/>
    </Container>
  )
}

