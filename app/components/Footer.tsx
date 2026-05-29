// Alt kode på denne side er endten Skrevet, optimeret, omskrevet og/eller rettet med AI

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-inner">
          <div className="footer-col">
            <Link href="/" className="footer-logo">
              <span className="logo-night">NIGHT</span>
              <span className="logo-club">CLUB</span>
              <span className="logo-tagline">HAVE A GOOD TIME</span>
            </Link>

            <div className="footer-info">
              <h4 className="footer-info-title">LOCATION</h4>
              <p>Kompagnistræde 278</p>
              <p>1265 København K</p>
            </div>

            <div className="footer-info">
              <h4 className="footer-info-title">OPENING HOURS</h4>
              <p>WED - THU 10:30 PM TO 3 AM</p>
              <p>SAT - SUN: 11 PM TO 5 AM</p>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">NEWS</h3>
            <div className="footer-news">
              <div className="footer-news-item">
                <Image
                  src="/assets/content-img/recent_post1.jpg"
                  alt="DJ Anya at The Blue Room"
                  width={80}
                  height={70}
                  className="footer-news-img"
                />
                <div>
                  <p>Get ready for an epic night with DJ Anya at The Blue Room. Doors open at 9 PM!</p>
                  <span className="footer-news-date">April 17, 2026</span>
                </div>
              </div>
              <div className="footer-news-item">
                <Image
                  src="/assets/content-img/recent_post2.jpg"
                  alt="Retro Night with DJ Elroy"
                  width={80}
                  height={70}
                  className="footer-news-img"
                />
                <div>
                  <p>Join us for Retro Night with DJ Elroy at The Velvet Room. Doors open at 8 PM!</p>
                  <span className="footer-news-date">April 17, 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">RECENT POSTS</h3>
            <div className="footer-posts">
              <div className="footer-post-item">
                <span className="footer-post-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </span>
                <div>
                  <p>It is a long established fact that a reader will be distracted by the readable...</p>
                  <span className="footer-news-date">5 hours ago</span>
                </div>
              </div>
              <div className="footer-post-item">
                <span className="footer-post-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </span>
                <div>
                  <p>Experience the electrifying beats of DJ Kai at Club Nova. Doors open at 10 PM, and the rhythm never stops.</p>
                  <span className="footer-news-date">5 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-bottom-copy">Night Club<br className="footer-br-mobile" /><span className="footer-bottom-sep"> - </span>All Rights Reserved</p>

          <div className="footer-social-wrap">
            <p className="footer-social-label">Stay Connected With Us</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook" className="social-link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="Snapchat" className="social-link">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M15.943 11.526a.836.836 0 0 0-.66-.709c-1.616-.253-2.927-1.31-3.55-2.8l-.012-.028a.835.835 0 0 1 .022-.734c.257-.483 1.089-.719 1.617-.948.114-.048.227-.1.332-.152a2.21 2.21 0 0 0 .568-.41.87.87 0 0 0 .27-.662c-.042-.518-.618-.924-1.108-.924-.12 0-.238.022-.35.068a3.25 3.25 0 0 1-.52.165c-.1.024-.197.037-.293.037-.27 0-.39-.102-.39-.102.011-.2.025-.397.036-.592.07-1.253.153-2.667-.249-3.67C10.698.86 9.365.023 8.01 0H7.99C6.636.023 5.302.86 4.545 2.065c-.402 1.003-.319 2.417-.249 3.67.01.195.025.393.036.592 0 0-.121.102-.39.102a2.46 2.46 0 0 1-.294-.037 3.253 3.253 0 0 1-.52-.165.87.87 0 0 0-.35-.068c-.49 0-1.066.406-1.108.924a.868.868 0 0 0 .27.661c.162.154.352.287.568.41.105.053.219.105.332.153.528.229 1.361.464 1.617.948a.835.835 0 0 1 .022.734l-.012.027C3.982 11.32 2.672 12.376 1.055 12.63a.838.838 0 0 0-.66.71.726.726 0 0 0 .154.572c.47.575 1.51.826 3.183 1.023.059.12.084.527.104.706.023.213.091.688.58.688.125 0 .25-.024.373-.046.312-.057.758-.132 1.35-.132.364 0 .72.033 1.07.098.458.085.772.272 1.097.43.325.157.681.23 1.097.23.416 0 .772-.073 1.097-.23.325-.158.639-.345 1.097-.43.35-.065.706-.098 1.07-.098.592 0 1.039.075 1.35.132.123.022.248.046.373.046.489 0 .557-.475.58-.688.02-.179.045-.587.104-.706 1.673-.197 2.712-.448 3.183-1.023a.726.726 0 0 0 .154-.572z"/>
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="social-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

          <p className="footer-copyright">Copyright © NightClub</p>
        </div>
      </div>
    </footer>
  );
}