export function renderHeader() {
    let heading = document.getElementById('heading')
    heading.innerHTML =    `<header class="items-center justify-between flex h-16 bg-gray-800 text-white pl-20 pr-20 underline">
                                <h3 class="text-[#FF9900]"><a href="index.html">AMAZON CLONE</a></h3>
                                <h3 class="ml-4"><a href="checkout.html">Cart (<span id="cartLength">0</span>)</a></h3>
                            </header>`
                        }
