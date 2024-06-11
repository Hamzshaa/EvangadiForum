export function applyStyleForCodes(input) {
  let replacedString = input
    .split("//")
    .join(
      `</span><code style="background-color: #ccc; color: #000; padding: 4px 8px; border-radius: 4px; font-family: 'Courier New', monospace; font-size: 1rem; width: fit-content;">`
    );
  replacedString = replacedString
    .split("\\\\")
    .join("</code><span style='font-size: 16px !important;'>");
  replacedString = replacedString
    .split(">>>")
    .join(
      `</span><pre><code style="display: block;  margin-top: 10px; background-color: #ccc; color: #000; padding: 4px 8px; border-radius: 4px; font-family: 'Courier New', monospace; min-width: fit-content; width: 100%;">`
    );
  replacedString = replacedString.split("<<<").join("</code></pre>");
  return (
    "<span style='font-size: 16px !important;'>" + replacedString + "</span>"
  );
}
