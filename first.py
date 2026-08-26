from pathlib import Path

src = Path("/mnt/data/Pasted code(6).html")
html = src.read_text(encoding="utf-8")

opening_css = r'''
        /* =========================================
           FIRST PAGE / OPENING ENVELOPE
        ========================================= */

        body {
            background: #f3eeea;
        }

        .opening-screen {
            position: fixed;
            inset: 0;
            z-index: 20000;
            min-height: 100vh;
            width: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 25px 18px;
            background:
                linear-gradient(rgba(247,244,239,.78), rgba(247,244,239,.78)),
                url("./bg.jpg.jpeg") center top / cover no-repeat;
            transition: opacity .8s ease, visibility .8s ease;
        }

        .opening-screen::before,
        .opening-screen::after {
            content: "";
            position: absolute;
            width: 220px;
            height: 420px;
            pointer-events: none;
            opacity: .85;
            background: url("./flower.png") center / contain no-repeat;
        }

        .opening-screen::before {
            top: -35px;
            right: -70px;
            transform: rotate(18deg);
        }

        .opening-screen::after {
            bottom: -55px;
            left: -75px;
            transform: scaleX(-1) rotate(8deg);
        }

        .opening-screen.opened {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

        .opening-content {
            position: relative;
            z-index: 2;
            width: min(100%, 820px);
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .opening-envelope {
            position: relative;
            width: min(92vw, 820px);
            cursor: pointer;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            outline: none;
            transition: transform .45s cubic-bezier(.22,.61,.36,1),
                        filter .45s ease,
                        opacity .65s ease;
        }

        .opening-envelope:hover {
            transform: translateY(-5px) scale(1.01);
            filter: drop-shadow(0 20px 35px rgba(45,52,42,.24));
        }

        .opening-envelope.opening {
            transform: scale(1.08);
            opacity: 0;
        }

        .opening-envelope img {
            width: 100%;
            height: auto;
            display: block;
            filter: drop-shadow(0 18px 30px rgba(38,48,38,.22));
        }

        .opening-hint {
            position: absolute;
            left: 50%;
            bottom: 10%;
            transform: translateX(-50%);
            width: 100%;
            text-align: center;
            color: #f7f4ef;
            font-family: "Cormorant Garamond", serif;
            font-size: clamp(22px, 3vw, 40px);
            letter-spacing: 2px;
            text-shadow: 0 2px 8px rgba(0,0,0,.18);
            pointer-events: none;
        }

        .opening-screen.opened .opening-content {
            animation: none;
        }

        @media (max-width: 650px) {
            .opening-screen {
                padding: 18px 12px;
                align-items: center;
            }

            .opening-envelope {
                width: min(95vw, 560px);
            }

            .opening-screen::before {
                width: 150px;
                height: 310px;
                right: -58px;
                top: -20px;
            }

            .opening-screen::after {
                width: 160px;
                height: 320px;
                left: -65px;
                bottom: -30px;
            }

            .opening-hint {
                bottom: 8%;
                font-size: clamp(19px, 6vw, 30px);
            }
        }
'''

opening_html = r'''
        <!-- =========================================
             FIRST PAGE / OPENING SCREEN
             Uses the image you provided as the envelope
        ========================================== -->
        <div class="opening-screen" id="openingScreen">
            <div class="opening-content">
                <div
                    class="opening-envelope"
                    id="openingEnvelope"
                    role="button"
                    tabindex="0"
                    aria-label="Tap to open the wedding invitation"
                >
                    <img
                        src="./opening-envelope.jpeg"
                        alt="A little note for you - tap to open"
                    >
                </div>
            </div>
        </div>
'''

opening_js = r'''
        /* =====================================
           FIRST PAGE OPENING
        ====================================== */

        const openingScreen =
            document.getElementById("openingScreen");

        const openingEnvelope =
            document.getElementById("openingEnvelope");

        let invitationOpened = false;

        function openInvitation() {

            if (invitationOpened) return;

            invitationOpened = true;

            openingEnvelope.classList.add("opening");

            setTimeout(function () {

                openingScreen.classList.add("opened");

                document.body.style.overflow = "";

            }, 450);

        }

        openingEnvelope.addEventListener(
            "click",
            openInvitation
        );

        openingEnvelope.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openInvitation();

                }

            }
        );
'''

# Insert CSS before the existing </style>
html = html.replace("        </style>", opening_css + "\n        </style>", 1)

# Insert opening screen immediately after <body>
html = html.replace("    <body>", "    <body>\n" + opening_html, 1)

# Insert JS immediately before the existing INITIALIZE SLIDER comment
html = html.replace(
    '        /* INITIALIZE SLIDER */',
    opening_js + '\n\n        /* INITIALIZE SLIDER */',
    1
)

out = Path("/mnt/data/wedding_invitation_complete.html")
out.write_text(html, encoding="utf-8")

print(f"Created: {out}")
