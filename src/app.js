/** @type HTMLDivElement*/
export const listElement = document.querySelector("#list");

/** @type HTMLDivElement*/
export const consoleOutput = document.querySelector("#output");

/** @type HTMLInputElement*/
export const consoleInput = document.querySelector("#console input");

/** @type HTMLSpanElement*/
export const consoleInputCursor = document.querySelector("#input-cursor");

/** @type HTMLDivElement*/
export const dayElement = document.querySelector("#day");

/** @type HTMLDivElement*/
export const consoleElement = document.querySelector("#console");


const dayNumber = 3;
const days = [...Array(dayNumber).keys()];

function clearConsole()
{
    while (consoleOutput.firstChild)
    {
        consoleOutput.removeChild(consoleOutput.firstChild);
    }
}

export function log(...messages)
{
    for (const message of messages)
    {
        const consoleLine = document.createElement("span");
        consoleLine.innerHTML = message;
        consoleOutput.appendChild(consoleLine);
    }
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

console.log = log;
console.error = log;
console.warn = log;
window.onerror = (message, source, lineno, colno, error) =>
{
    log(`${ source } (${ lineno }): ${ message }`);
    document.querySelector("#running-overlay").classList.add("hidden");
};

window.onunhandledrejection = (event) =>
{
    log(event.reason);
    document.querySelector("#running-overlay").classList.add("hidden");
    event.preventDefault();
};

async function loadFile(day, part, file, targetElement)
{
    const filename = `/Day${ day }/Part${ part }/${ file }`;
    log(filename);

    const pre = document.querySelector(targetElement);
    const runBtn = pre.previousElementSibling.querySelector("span.button");

    const response = await fetch(filename);
    if (!response.ok)
    {
        pre.innerHTML = "File Not Found";
        runBtn.style.display = "none";
        runBtn.onclick = null;
        return;
    }
    const fileContents = await response.text();
    const formatted = fileContents.replace(/[<]/g, "&lt;").replace(/[>]/g, "&gt;");
    const lines = formatted.split("\n");
    const data = [];
    for (const line of lines)
    {
        data.push(`<code>${ line }</code>`);
    }
    pre.innerHTML = data.join("");

    let input = (await import(`/Day${ day }/Part${ part }/input.js`)).default;
    let solution = (await import(filename)).default;
    runBtn.onclick = async (event) =>
    {
        event.stopPropagation();
        event.preventDefault();
        clearConsole();
        log(`Running '${ filename }'`);
        document.querySelector("#running-overlay").classList.remove("hidden");
        let result = await solution(input);
        if (result !== undefined)
        {
            log(result);
        }
        document.querySelector("#running-overlay").classList.add("hidden");
    };
}

async function openDay(day)
{
    const padDay = (day + "").padStart(2, "0");
    log(`Loading Day ${ padDay }...`);

    for (const pre of document.querySelectorAll("pre"))
    {
        if (!pre.classList.contains("hidden"))
        {
            pre.classList.add("hidden");
        }
    }
    history.pushState({day: day}, `Day ${ (day + "").padStart(2, "0") }`, `?day=${ day }`);
    listElement.classList.add("hidden");
    dayElement.classList.remove("hidden");


    document.querySelector(`#day-label`).innerHTML = `Day ${ padDay }`;
    await loadFile(padDay, "01", "main.js", `#part-1 .code-pre`);
    await loadFile(padDay, "01", "tests.js", `#part-1 .tests-pre`);

    await loadFile(padDay, "02", "main.js", `#part-2 .code-pre`);
    await loadFile(padDay, "02", "tests.js", `#part-2 .tests-pre`);
    log(`Day ${ padDay } Loaded!`);
}

window.addEventListener("popstate", async (event) =>
{
    if (event.state == null)
    {
        listElement.classList.remove("hidden");
        dayElement.classList.add("hidden");
    }
    else
    {
        await openDay(event.state.day);
    }
});

window.addEventListener("load", async () =>
{
    for (let day of days)
    {
        const dayLink = document.createElement("div");
        dayLink.classList.add("button");
        dayLink.innerHTML = `Day ${ (day + 1 + "").padStart(2, "0") }`;
        dayLink.onclick = async () => {await openDay(day + 1);};
        listElement.appendChild(dayLink);
    }

    /**@type {NodeListOf<HTMLDivElement>} */
    const codeHeaders = document.querySelectorAll(".code-header");
    for (const codeHeader of codeHeaders)
    {
        codeHeader.addEventListener("click", (ev) =>
        {
            if (codeHeader.nextElementSibling.classList.contains("hidden"))
            {
                codeHeader.nextElementSibling.classList.remove("hidden");
            }
            else
            {
                codeHeader.nextElementSibling.classList.add("hidden");
            }
        });
    }

    consoleInput.disabled = true;
    consoleInput.addEventListener("focus", () =>
    {
        consoleInputCursor.classList.add("blink");
    });

    consoleInput.addEventListener("blur", () =>
    {
        consoleInputCursor.classList.remove("blink");
    });

    log("Welcome to Advent of Code 2021");
    const params = new URLSearchParams(window.location.search);
    if (params.has("day"))
    {
        const day = parseInt((params.get("day")));
        openDay(day);
    }
});

export async function requestInput()
{
    consoleInput.disabled = false;

    consoleElement.addEventListener("click", () =>
    {
        consoleInput.focus();
    });

    return new Promise((resolve) =>
    {
        const inputSumbit = (event) =>
        {
            if (event.key === "Enter")
            {
                const value = consoleInput.value;
                consoleInput.value = "";
                log(value);
                consoleInput.blur();
                consoleInput.removeEventListener("keyup", inputSumbit);
                consoleInput.disabled = true;
                resolve(value);
            }
        };
        consoleInput.focus();
        consoleInput.addEventListener("keyup", inputSumbit);
    });
}