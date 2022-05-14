class CommonHeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
		<header>
			<a class='logo' href="/index.html"><img class="logo_img" src="/assets/images/navbar_logo.png" alt="Chimm"></a>
			<nav>
				<ul>
					<li><a class="link_effect" href="/index.html">Home</a></li>
					<li><a class="link_effect" href="marketplace.html">Marketplace</a></li>
					<li><a class="link_effect" href="about_us.html">About Us</a></li>
				</ul>
			</nav>
			<ul class="button">
				<li><a class="sign_in" href="sign_in.html">Sign In</a></li>
				<!-- <li><a class="sign_up button_effect" href="sign_up.html">Sign Up</a></li> -->
			</ul>
        	<div id="profile_group" class="profile hidden">
            	<div onclick="dropdown()" class="profile_container">
					<p id="username" >Username</p>
					<img id="profile_picture_image" class="profile_picture" src="/assets/images/profile_picture.png" alt="Profile Picture">
				</div>
				<div class="drop_down" id="drop_down_menu">
					<a href="profile.html">Profile</a>
					<a id="sign_out_button" href="/index.html">Sign Out</a>
				</div>
        	</div>
    	</header>`;
	}
}

customElements.define("chimm-header", CommonHeader);

class CommonFooter extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
		<footer>
			<div class="button_container">
				<div class="sign_in_section">
					<span>Already have an account?</span>
					<h2>Start renting</h2>
					<a href="sign_in.html">Sign In</a>
				</div>
				<hr>
				<div class="sign_up_section">
					<span>Want to rent a House?</span>
					<h2>Let’s get started</h2>
					<a href="sign_up.html">Sign Up</a>
				</div>
			</div>

			<nav>
				<ul>
					<li><a class="link_effect" href="/index.html">Home</a></li>
					<li><a class="link_effect" href="marketplace.html">Marketplace</a></li>
					<li><a class="link_effect" href="about_us.html">About Us</a></li>
					<li><a class="link_effect" href="privacy_policy.html">Privacy Policy</a></li>
					<li><a class="link_effect" href="toc.html">Terms & Conditions</a></li>
				</ul>
			</nav>

			<div class="icons">
				<a href="https://facebook.com"><img src="/assets/images/facebook_logo.png" alt="Facebook"></a>
				<a href="https://twitter.com"><img src="/assets/images/twitter_logo.png" alt="Twitter"></a>
				<a href="https://instagram.com"><img src="/assets/images/instagram_logo.png" alt="Instagram"></a>
			</div>

			<p>Copyright &copy 2022 | Chimm | All rights reserved</p>
    	</footer>`;
	}
}

customElements.define("chimm-footer", CommonFooter);
