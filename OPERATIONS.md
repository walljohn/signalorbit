# SignalOrbit — Operations

How the business runs day to day, and the exact steps still needed before
the first paying client. The website is finished; nearly everything here is
about the work behind it.

Companion documents:

- **Lead Desk** (private tracker): https://claude.ai/artifact/SzohN1UkiKWdK4PtvstL8x
- **Client documents** (Google Drive): the "SignalOrbit — Client Documents"
  folder holds the Lead Brief template, the Client Service Agreement draft and
  the Proposal template.
- **LEGAL-CHECKLIST.md** — every placeholder in the public legal pages.

---

## 1. Launch checklist

Do these in order. The first two block taking an enquiry at all.

| # | Item | Who | Status |
| --- | --- | --- | --- |
| 1 | Connect the consultation form (section 2) | you, in Vercel | open |
| 2 | Create a monitored privacy/contact mailbox and fill the legal placeholders (LEGAL-CHECKLIST.md) | you | open |
| 3 | Choose research sources and an email verification method (section 3) | you | open |
| 4 | Have a Canadian lawyer review the legal pages and the Client Service Agreement | you | open |
| 5 | Time one real batch of 25 (section 6) and set pricing from it | you | open |
| 6 | Set up a separate sending domain for your own outreach (section 7) | you | open |
| 7 | Lead Brief, delivery format, suppression list, agreement, proposal | done | ✓ |

---

## 2. Connect the consultation form

Every button on the site leads to the form. Until this is done, a submission
shows an honest error and you never see it.

Simplest working setup — a webhook into Google Sheets:

1. Create a Google Sheet called "SignalOrbit enquiries" with the headers
   `receivedAt, name, email, website, audience, goals, userAgent`.
2. Extensions → Apps Script. Paste:

   ```js
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
     const d = JSON.parse(e.postData.contents);
     sheet.appendRow([d.receivedAt, d.name, d.email, d.website, d.audience, d.goals, d.userAgent]);
     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. Deploy → New deployment → Web app → Execute as **Me**, access **Anyone**.
   Copy the web app URL.
4. In Vercel: project `signalorbit-app` → Settings → Environment Variables →
   add `CONSULTATION_WEBHOOK_URL` = that URL, for Production and Preview.
5. Redeploy (Deployments → ⋯ → Redeploy on the latest).
6. Test: submit the form on signalorbit.app with a clearly marked test entry.
   The success screen only appears if the webhook returned 2xx; check the
   sheet.
7. Turn on a Google Sheets notification (Tools → Notification settings →
   "any changes", email right away) so you hear about enquiries immediately.

Alternative: Resend. Set `RESEND_API_KEY`, `CONSULTATION_TO_EMAIL` and
`CONSULTATION_FROM_EMAIL` instead (the from-domain must be verified in Resend).
README.md documents both.

---

## 3. Research: how a lead is made

Per lead, in order. Stop at the first step that fails; the record goes back to
Researching, not to the client.

1. **Company fits the brief.** Industry, size, geography, and not on any
   exclusion list. Tick "Matches the written target" in the Lead Desk only when
   you have checked all four.
2. **Two sourced facts.** Each fact is specific and checkable, and each source
   is a URL or a named page you could open in front of the client. Good facts
   are recent and imply a need (a new location, a job posting, a new service
   line, a compliance deadline). "Nice website" is not a fact.
3. **The decision-maker.** The person who owns the problem, by what they do,
   not by title alone. Record name and role. If the primary role does not exist,
   use the alternative role from the brief.
4. **Work email, verified.** Find it, then verify it with a verification tool
   (bounce-check services are inexpensive and fast) or by confirming it is
   published by the company itself. Record *how* it was verified in the "How it
   was verified" field — that line is delivered to the client.
5. **Suppression check.** The Lead Desk flags any email or domain on the
   suppression list automatically. A flagged lead is never delivered.
6. **Recommended approach.** Route, reason, angle and a draft opener built only
   from the sourced facts. The "Draft approach with Claude" button does this;
   read it before saving and remove anything not supported by the facts.
7. **Consent basis.** Record why contacting this person by email is lawful
   under CASL. For a conspicuously published business address and a
   role-relevant message, that is implied consent.

Sources to consider, and what to check before using each: the company's own
website and news page; public job boards; business registries and licensing
bodies; local business directories and chambers of commerce; press releases;
professional networking sites (read the terms — automated collection is
generally prohibited; manual research generally is not); and licensed B2B data
providers (read the licence — some prohibit onward delivery to your clients).
Whatever you settle on, list it in the Privacy Policy under `[DATA SOURCES]`.

---

## 4. Delivery

1. In the Lead Desk, filter to the leads for this client and press **Export for
   client**. Only leads that meet all four criteria, are not examples, are not
   suppressed, and are not marked Not a fit are included; everything internal
   (stage, consent notes, activity, next actions) is left out.
2. Open the CSV and read it as the client will. Fix anything unclear in the
   Lead Desk and export again.
3. Send it with a short note: the count, the brief it was researched against,
   the 5-business-day acceptance window, and a reminder to pass opt-outs back.
4. Log the delivery on each lead ("Delivered to [client] [date]").
5. Flagged leads: replace or don't count, within the window. Keep it generous
   the first time — the free batch is a sales tool.

---

## 5. Suppression: the promise behind the Do Not Contact page

The public pages promise action within one business day where possible and
10 business days at the outside. The process:

1. A request arrives at the privacy mailbox, or a client passes one on.
2. Lead Desk → **Suppression** → add the email address, or the whole domain if
   the person asked for their company not to be contacted. Record the reason.
3. If the person is an existing lead, open it and use **Add to suppression** —
   this adds the entry and closes the lead as Not a fit in one step.
4. Tell the client who received the lead to stop and to suppress on their side.
5. Reply to the person confirming it is done. Keep the reply short and don't
   ask why.

Export the list occasionally (Suppression → Export list) and keep the copy
somewhere safe; it is the one dataset you must never lose.

---

## 6. Time a batch before you price anything

Run one real batch of 25 for a real target and record, per lead, the minutes
spent on each step in section 3, plus tool costs. Then:

    cost per lead = (total hours × your hourly rate + tool costs) ÷ 25
    monthly fee   = leads per month × cost per lead × (1 + margin)

Pick a margin that survives a batch taking twice as long as planned. Put the
result in the Proposal template. Do not quote a number you have not tested.

---

## 7. Your own outreach

You sell by doing to yourself what you sell. Hold yourself to the same rules
you put on clients:

- **Separate sending domain.** Register a variant (e.g. a `.co` or a
  "get-"/"try-" prefix) so your main domain's reputation is never at risk.
- **Authentication.** SPF, DKIM and DMARC on the sending domain. Your email
  provider's setup guide covers all three; verify with any free DMARC checker.
- **Warm-up.** Start at a handful of messages a day and increase over three to
  four weeks. Reply rates and bounce rates decide the pace, not the calendar.
- **Every message:** who you are and your business, a physical postal address,
  a role-relevant reason for writing (the sourced facts), and a one-line
  opt-out that you honour the same day.
- **Volume.** Stay well inside your provider's limits. A cold email domain
  sending a few dozen a day, carefully, outperforms one sending hundreds.
- **Consent basis.** Record it in the Lead Desk for every lead you contact.

---

## 8. Weekly rhythm

- **Daily:** open the Lead Desk; work the "Due today" list; check the privacy
  mailbox.
- **Weekly:** export the suppression list; review which sources produced leads
  that clients accepted; note anything for the Privacy Policy's source list.
- **Monthly:** send each client a short note (delivered, replaced, what you're
  seeing); review pricing against actual hours.
