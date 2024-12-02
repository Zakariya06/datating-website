// normally we would only need to use ReactChild and ReactChildren in Web. For Native we need to extend it a little further
export type ReactChildren =
  | React.ReactChild
  | React.ReactChildren
  | React.ReactChild[]
  | React.ReactNode
  | React.ReactNodeArray
  | JSX.Element
  | JSX.Element[];
