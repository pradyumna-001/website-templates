import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'
import { Link, type LinkProps } from 'react-router-dom'

type CtaVariant = 'primary' | 'whatsapp'

interface CtaBaseProps {
  variant?: CtaVariant
  children: ReactNode
  className?: string
}

type CtaLinkMemberProps = Pick<CtaBaseProps, 'variant' | 'children' | 'className'> &
  Omit<LinkProps, 'className'>

type CtaAnchorMemberProps = Pick<CtaBaseProps, 'variant' | 'children' | 'className'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>

type CtaButtonMemberProps = Pick<CtaBaseProps, 'variant' | 'children' | 'className'> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

/**
 * Renders a react-router-dom <Link> for internal routes (keyed on `to`).
 */
type CtaLinkProps = CtaLinkMemberProps & {
  to: LinkProps['to']
  href?: never
}

/**
 * Renders an external <a> when `href` is present.
 */
type CtaAnchorProps = CtaAnchorMemberProps & {
  href: string
  to?: never
}

/**
 * Renders a plain <button> when neither navigation prop is present.
 */
type CtaButtonPlainProps = CtaButtonMemberProps & {
  to?: never
  href?: never
}

export type CtaButtonPropsUnion =
  | CtaLinkProps
  | CtaAnchorProps
  | CtaButtonPlainProps

/**
 * Reusable call-to-action button/anchor.
 *
 * Picks the host element from the navigation prop supplied:
 * - `to`   -> a react-router-dom <Link> (internal route)
 * - `href` -> a plain <a> (external link)
 * - neither -> a <button>
 *
 * Applies the shared `cta` base class plus a `cta--<variant>` modifier and
 * spreads all extra props + children onto the host element.
 */
export default function CtaButton({
  variant = 'primary',
  children,
  className,
  ...rest
}: CtaButtonPropsUnion) {
  const classes = ['cta', `cta--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  if ('to' in rest && rest.to !== undefined) {
    const { to } = rest
    const extra = { ...rest } as Record<string, unknown>
    return (
      <Link to={to} className={classes} {...extra}>
        {children}
      </Link>
    )
  }

  if ('href' in rest && rest.href !== undefined) {
    const { href } = rest
    const extra = { ...rest } as Record<string, unknown>
    return (
      <a href={href} className={classes} {...extra}>
        {children}
      </a>
    )
  }

  const extra = { ...rest } as Record<string, unknown>
  return (
    <button className={classes} {...extra}>
      {children}
    </button>
  )
}