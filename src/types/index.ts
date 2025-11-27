export interface NavItem {
  label: string
  id: string
}

export interface ProductItem {
  name: string
  price: string
  img: string
}

export interface Review {
  user: string
  role: string
  text: string
  rating: number
}

export interface TechFeature {
  title: string
  desc: string
}

export interface LookbookImage {
  src: string
  alt: string
  colSpan?: number
  rowSpan?: number
}
