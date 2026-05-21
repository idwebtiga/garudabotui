import type { ComponentPropsWithoutRef, ElementType } from 'react'

export type PolymorphicProps<T extends ElementType, P = unknown> = {
  as?: T
} & ComponentPropsWithoutRef<T> &
  P
