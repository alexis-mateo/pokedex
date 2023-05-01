import { CardSkeleton } from './CardSkeleton'

export const Loader = ({ count }) => [...Array(count).keys()].map(
  (_, index) => <CardSkeleton key={index} />
)