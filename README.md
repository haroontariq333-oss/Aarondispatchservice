# Aaron Dispatch Service website

One-page static website for Aaron Dispatch Service: truck dispatch for owner-operators and small fleets at 5% flat, with no contracts and no forced dispatch.

The messaging, colors (navy `#0A192F`, orange `#FF6B00`, white) and fonts (Barlow / Barlow Condensed) match the Instagram and Facebook marketing.

## Files

- `index.html`: page content
- `styles.css`: styles
- `script.js`: mobile menu, fee calculator, lead form
- `favicon.svg`: browser tab icon

## Preview locally

Open `index.html` in a browser.

## Publish free with GitHub Pages

Repo **Settings → Pages → Build and deployment → Deploy from a branch**, pick the branch and `/ (root)`, then save. The site goes live at `https://<username>.github.io/<repo>/`. A custom domain such as `aarondispatch.com` can be added on the same page.

## Things to update

- **Phone / WhatsApp**: none is listed yet. Add one to the contact list in the "Get started" section.
- **Lead form**: submissions are sent from the page through [FormSubmit](https://formsubmit.co) (free, no account) and arrive as emails at `aarondispatchservice@gmail.com`. The very first submission triggers a one-time activation email from FormSubmit: click the link in it, and every submission after that is delivered. To change the receiving address, edit `CONTACT_EMAIL` in `script.js`.
- **Testimonials / load of the week**: add a section once you have real client results.
