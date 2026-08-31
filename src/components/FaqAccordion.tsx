import { useState, useId } from 'react'
import { useSiteConfig } from './SiteConfigContext'

/**
 * FAQ accordion (GitHub issue #17).
 *
 * Common questions answered up front, in a damage-controlling conversation.
 * Norman: clear, useful answers to errors and uncertainty read best as an
 * honest back-and-forth — the question is asked in the user's own words and a
 * direct answer follows in plain language. Exposing likely questions before
 * the visitor has to ask is also a reservoir of goodwill (Krug, "Don't Make Me
 * Think") — you spare them the effort of hunting for an answer.
 *
 * Accessibility: each row is a <fieldset> with a <button> that toggles its own
 * panel. The button carries `aria-expanded` and `aria-controls`; the panel is
 * announced via a labelled heading id. Only one panel is open at a time, and
 * all start closed so the list collapses to a scannable set of questions. If
 * the config provides no FAQ items, nothing is rendered — an empty accordion
 * would be dead weight.
 */
export default function FaqAccordion() {
  const { faq } = useSiteConfig()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const baseId = useId()

  if (!faq || faq.length === 0) return null

  return (
    <section className="faq" aria-label="Frequently asked questions">
      <h2 className="faq__heading">FAQ</h2>
      {faq.map((item, index) => {
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`
        const open = openIndex === index
        return (
          <div className="faq__row" key={item.q}>
            <h3 className="faq__question">
              <button
                id={buttonId}
                type="button"
                className="faq__toggle"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span className="faq__question-text">{item.q}</span>
                <svg
                  className="faq__chevron"
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M4 6l4 4 4-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="faq__answer"
            >
              {item.a}
            </div>
          </div>
        )
      })}
    </section>
  )
}