// define templates for the Ella-Halothemes-6.5.2 theme

var _usfImageWidths;
var _usfFilesUrl;
var _usfProductCartTitle = `
<a class="card-title link-underline" :class="{'card-title-ellipsis': _usfGlobalSettings.product_title_line_text != 'full', 'card-title-change': product.selectedVariantId}" :href="'/products/' + product.urlName" :data-product-title="product.title" :data-product-url="'/products/' + product.urlName">
    <span class="text">
        <span v-html="product.title"></span>
    </span>
</a>`;

var _usfImageProductCard = `
<template v-if="product.images.length">
    <img v-bind="_usfGetImgAttrs(selectedImage, product.images[0].url, scaledSelectedImageUrl)" />
    <img v-if="_usfGlobalSettings.show_image_swap && hoverImage" v-bind="_usfGetImgAttrs(hoverImage, hoverImageUrl,scaledHoverImageUrl)" />
    <span v-if="_usfGlobalSettings.enable_lazyload" class="data-lazy-loading"></span>
    <div v-if="_usfGlobalSettings.show_image_loading" class="media-loading" :data-title="_usfGlobalSettings.image_loading_text" v-html="_usfGlobalSettings.image_loading_text"></div>
</template>
<div v-else class="usf-no-image" v-html="_usfNoImageSvg"></div>`;
var _usfPrice = `
<div class="price" :class="{'price--sold-out': isSoldOut,'price--on-sale': hasDiscount && (!(priceVaries && !product.selectedVariantId) || (minPrice > minDiscountedPrice))}">
    <dl>
        <div class="price__regular">
            <dt>
                <span class="visually-hidden visually-hidden--inline">Regular price</span>
            </dt>
            <dd class="price__last">
                <span v-if="priceVaries && !product.selectedVariantId" class="price-item price-item--regular">
                    <span class="text" v-html="loc.from"></span>
                    <span  v-html="displayMinDiscountedPrice"></span>
                </span>
                <span v-else class="price-item price-item--regular" v-html="displayDiscountedPrice"></span>
            </dd>
        </div>
        <div class="price__sale">
            <dt class="price__compare">
                <span class="visually-hidden visually-hidden--inline">Regular price</span>
            </dt>
            <dd class="price__compare">
                <s class="price-item price-item--regular" v-html="priceVaries && !product.selectedVariantId ? displayMinPrice : displayPrice"></s>
            </dd>
            <dt>
                <span class="visually-hidden visually-hidden--inline">Sale price</span>
            </dt>
            <dd class="price__last">
                <span v-if="priceVaries && !product.selectedVariantId" class="price-item price-item--sale">
                    <span class="text" v-html="loc.from"></span>
                    <span  v-html="displayMinDiscountedPrice"></span>
                </span>
                <span v-else class="price-item price-item--sale" v-html="displayDiscountedPrice"></span>
            </dd>
        </div>
    </dl>
</div>`;
var _usfVariantPrice = `
<div class="price" :class="{'price--sold-out': usf.utils.isVariantSoldOut(v),'price--on-sale': v.compareAtPrice > v.price}">
    <dl>
        <div class="price__regular">
            <dt>
                <span class="visually-hidden visually-hidden--inline">Regular price</span>
            </dt>
            <dd class="price__last">
                <span class="price-item price-item--regular" v-html="usf.utils.getDisplayPrice(v.price)"></span>
            </dd>
        </div>
        <div class="price__sale">
            <dt class="price__compare">
                <span class="visually-hidden visually-hidden--inline">Regular price</span>
            </dt>
            <dd class="price__compare">
                <s class="price-item price-item--regular" v-html="usf.utils.getDisplayPrice(v.compareAtPrice)"></s>
            </dd>
            <dt>
                <span class="visually-hidden visually-hidden--inline">Sale price</span>
            </dt>
            <dd class="price__last">
                <span class="price-item price-item--sale" v-html="usf.utils.getDisplayPrice(v.price)"></span>
            </dd>
        </div>
    </dl>
</div>`;
var _usfProductCard = `
<div class="product-item usf-card-1" :class="{'enable_background_button_card': _usfGlobalSettings.enable_background_button_card}" :data-product-id="product.id" :data-json-product="dataJson">
    <div class="card">
        <div :class="'card-product ' + (product.images.length ? '' : 'card--text-only card--soft')"> 
            <div class="card-product__wrapper">
                <!--badges-->
                <usf-badges v-if="_usfGlobalSettings.show_badge" :sale="hasDiscount" :soldOut="isSoldOut" :product="product" :badgeClass="'card__badge'" :salePercent="salePercent" :loc="loc" :pIndex="pIndex"></usf-badges>
                <div class="card-media media--loading-effect" :class="['card-media--' + _usf_media_size,{'media--hover-effect': hoverImage && _usfGlobalSettings.show_image_swap,'has-compare': _usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'}]" :href="productUrl" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :style="cardMediaStyle">
                    <!-- Labels -->
                    <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
                    <!-- Wishlist -->
                    <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
                    `+_usfImageProductCard+`
                    <a class="card-link" :href="productUrl" :title="product.title"></a>
                </div>
                <!--product_action_group-->
                <div v-if="_usf_show_quick_view || _usf_show_wishlist || _usf_show_compare" :class="'card-product__group group-' + _usfGlobalSettings.group_quickview_wishlist">
                    <div v-if="_usf_show_wishlist" class="card-product__group-item card-wishlist">
                        <button class="wishlist-icon" title="Add to wishlist" data-wishlist :data-wishlist-handle="product.urlName" :data-product-id="product.id">
                            <span class="text" v-html="window._usfAddWishlistTxt"></span>
                            <svg viewBox="0 0 512 512" class="icon icon-wishlist">
                                <g>
                                    <g>
                                        <path d="M474.644,74.27C449.391,45.616,414.358,29.836,376,29.836c-53.948,0-88.103,32.22-107.255,59.25
                                            c-4.969,7.014-9.196,14.047-12.745,20.665c-3.549-6.618-7.775-13.651-12.745-20.665c-19.152-27.03-53.307-59.25-107.255-59.25
                                            c-38.358,0-73.391,15.781-98.645,44.435C13.267,101.605,0,138.213,0,177.351c0,42.603,16.633,82.228,52.345,124.7
                                            c31.917,37.96,77.834,77.088,131.005,122.397c19.813,16.884,40.302,34.344,62.115,53.429l0.655,0.574
                                            c2.828,2.476,6.354,3.713,9.88,3.713s7.052-1.238,9.88-3.713l0.655-0.574c21.813-19.085,42.302-36.544,62.118-53.431
                                            c53.168-45.306,99.085-84.434,131.002-122.395C495.367,259.578,512,219.954,512,177.351
                                            C512,138.213,498.733,101.605,474.644,74.27z M309.193,401.614c-17.08,14.554-34.658,29.533-53.193,45.646
                                            c-18.534-16.111-36.113-31.091-53.196-45.648C98.745,312.939,30,254.358,30,177.351c0-31.83,10.605-61.394,29.862-83.245
                                            C79.34,72.007,106.379,59.836,136,59.836c41.129,0,67.716,25.338,82.776,46.594c13.509,19.064,20.558,38.282,22.962,45.659
                                            c2.011,6.175,7.768,10.354,14.262,10.354c6.494,0,12.251-4.179,14.262-10.354c2.404-7.377,9.453-26.595,22.962-45.66
                                            c15.06-21.255,41.647-46.593,82.776-46.593c29.621,0,56.66,12.171,76.137,34.27C471.395,115.957,482,145.521,482,177.351
                                            C482,254.358,413.255,312.939,309.193,401.614z"></path>
                                    </g>
                                </g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                            </svg>
                        </button>
                    </div>
                    <div v-if="_usf_show_quick_view" class="card-product__group-item card-quickview card-quickviewIcon">
                        <button class="quickview-icon" :title="loc.quickView" :data-product-id="product.id" data-open-quick-view-popup :data-product-handle="product.urlName">
                            <span class="text" v-html="loc.quickView"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999" aria-hidden="true" focusable="false" role="presentation" class="icon icon-eyes">
                                <path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
                                            c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
                                            C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
                                            c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
                                            C447.361,287.923,358.746,385.406,255.997,385.406z"></path>
                                <path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
                                            s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
                                            s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"></path>
                            </svg>
                        </button>
                    </div>
                    <!--compare-btn-->
                    <usf-compare-btn v-if="_usf_show_compare" :compareClass="'card-product__group-item card-compare card-compareIcon'" :product="product"></usf-compare-btn>
                </div>

                <!--item-size -->
                <usf-item-size v-if="_usfGlobalSettings.display_item_size && sizeOption && !isSoldOut && product.variants.length > 0" :product="product" :option="sizeOption" :optionIndex="sizeIndex" :productUrl="productUrl"></usf-item-size>

                <div v-if="_usfGlobalSettings.show_quick_view && _usfGlobalSettings.product_quick_view_type == 'default'" class="card-quickview">
                    <button class="quickview-button button" :title="loc.quickView" :data-product-id="product.id" data-open-quick-view-popup :data-product-handle="product.urlName" v-html="loc.quickView"></button>
                </div>
                <!--add to cart form-->
                <div v-if="_usfGlobalSettings.show_action" class="card-action" :class="{'has-compare': _usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'}" v-html="gridAddToCartForm"></div>

                <!--compare-btn-->
                <usf-compare-btn v-if="_usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'" :compareClass="'card-compare'" :product="product"></usf-compare-btn>
            </div>
        </div>
        <div class="card-information">
            <div class="card-information__wrapper" :class="['text-' + _usfGlobalSettings.product_content_text_align]">
                <!--vendor-->
                <div v-if="_usfGlobalSettings.show_vendor && usf.settings.search.showVendor" class="card-information__group card-information__group-2">
                    <div class="card-vendor">
                        <span class="visually-hidden" v-html="window._usfVendorText"></span>
                        <a :href="usf.platform.baseUrl + '/collections/vendors?q=' + encodeURIComponent(product.vendor)" v-html="product.vendor"></a>
                    </div>
                </div>
                <!--title-->
                <h3 class="card__heading">
                    <a class="card-title link-underline" :class="{'card-title-ellipsis': _usfGlobalSettings.product_title_line_text != 'full', 'card-title-change': product.selectedVariantId}" :href="'/products/' + product.urlName" :data-product-title="product.title" :data-product-url="'/products/' + product.urlName">
                            <span v-html="product.title"></span>
                    </a>
                </h3>

                <!-- Product review -->
                <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
                <!--Description-->
                <div class="card-summary card-list__hidden" v-html="shortDescription"></div>
                <!--price-->
                <div class="card-price">
                    `+_usfPrice+`
                </div>
            </div>
            <!--color swatch-->
            <template v-if="colorOption">
                <div v-if="!_usfGlobalSettings.show_swatch" class="hidden">
                    <usf-product-swatch :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
                </div>
                <usf-product-swatch v-else :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
            </template>
            <!-- Swatch-->
            <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
            <span v-if="_usfGlobalSettings.display_text_size && sizeOption && sizeOption.values.length" class="text-size" :class="['text-' + _usfGlobalSettings.product_content_text_align]" v-html="window._usfMoreSizeTxt"></span>
            <!--list form-->
            <div v-if="_usfGlobalSettings.show_action" class="usf-list-form" v-html="listAddToCartForm"></div>

            <div v-if="_usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'" class="card-compare-wrapper card-list__hidden">
                <usf-compare-btn :compareClass="'card-compare'" :product="product" :check="true"></usf-compare-btn>
            </div>
        </div>
    </div>
</div>`;
var _usfProductCard2 = `
<div class="product-item usf-card-2" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :class="{'disable_product_card_border': _usfGlobalSettings.disable_product_card_border,'enable_custom_layout_card': _usfGlobalSettings.enable_custom_layout_card, 'enable_custom_content': _usfGlobalSettings.disable_product_card_border && _usfGlobalSettings.enable_custom_layout_card}" :data-product-id="product.id" :data-json-product="dataJson">
    <div class="card">
        <div :class="'card-product ' + (product.images.length ? '' : 'card--text-only card--soft')">
            <div class="card-product__wrapper">
                <!--badges-->
                <usf-badges v-if="_usfGlobalSettings.show_badge" :sale="hasDiscount" :soldOut="isSoldOut" :product="product" :badgeClass="'card__badge'" :salePercent="salePercent" :loc="loc" :pIndex="pIndex"></usf-badges>
                <div class="card-media media--loading-effect" :class="['card-media--' + _usf_media_size,{'media--hover-effect': hoverImage && _usfGlobalSettings.show_image_swap,'has-compare': _usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'}]"   :style="cardMediaStyle">
                    <!-- Labels -->
                    <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
                    <!-- Wishlist -->
                    <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
                    `+_usfImageProductCard+`
                    <a class="card-link" :href="productUrl" :title="product.title"></a>
                </div>
                <div v-if="_usf_show_quick_view || _usf_show_wishlist || _usf_show_compare" :class="'card-product__group group-' + _usfGlobalSettings.group_quickview_wishlist">
                    <div v-if="_usf_show_wishlist && !_usfGlobalSettings.enable_custom_layout_card" class="card-product__group-item card-wishlist">
                        <button title="Add to wishlist" class="wishlist-icon"  data-wishlist :data-wishlist-handle="product.urlName" :data-product-id="product.id">
                            <span class="visually-hidden" v-html="window._usfAddWishlistTxt"></span>
                            <span class="text" v-html="window._usfAddWishlistTxt"></span>
                            <svg viewBox="0 0 512 512" class="icon icon-wishlist">
                                <g>
                                    <g>
                                        <path d="M474.644,74.27C449.391,45.616,414.358,29.836,376,29.836c-53.948,0-88.103,32.22-107.255,59.25
                                                    c-4.969,7.014-9.196,14.047-12.745,20.665c-3.549-6.618-7.775-13.651-12.745-20.665c-19.152-27.03-53.307-59.25-107.255-59.25
                                                    c-38.358,0-73.391,15.781-98.645,44.435C13.267,101.605,0,138.213,0,177.351c0,42.603,16.633,82.228,52.345,124.7
                                                    c31.917,37.96,77.834,77.088,131.005,122.397c19.813,16.884,40.302,34.344,62.115,53.429l0.655,0.574
                                                    c2.828,2.476,6.354,3.713,9.88,3.713s7.052-1.238,9.88-3.713l0.655-0.574c21.813-19.085,42.302-36.544,62.118-53.431
                                                    c53.168-45.306,99.085-84.434,131.002-122.395C495.367,259.578,512,219.954,512,177.351
                                                    C512,138.213,498.733,101.605,474.644,74.27z M309.193,401.614c-17.08,14.554-34.658,29.533-53.193,45.646
                                                    c-18.534-16.111-36.113-31.091-53.196-45.648C98.745,312.939,30,254.358,30,177.351c0-31.83,10.605-61.394,29.862-83.245
                                                    C79.34,72.007,106.379,59.836,136,59.836c41.129,0,67.716,25.338,82.776,46.594c13.509,19.064,20.558,38.282,22.962,45.659
                                                    c2.011,6.175,7.768,10.354,14.262,10.354c6.494,0,12.251-4.179,14.262-10.354c2.404-7.377,9.453-26.595,22.962-45.66
                                                    c15.06-21.255,41.647-46.593,82.776-46.593c29.621,0,56.66,12.171,76.137,34.27C471.395,115.957,482,145.521,482,177.351
                                                    C482,254.358,413.255,312.939,309.193,401.614z"></path>
                                    </g>
                                </g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                            </svg>
                        </button>
                    </div>
                    <div v-if="_usf_show_quick_view" class="card-product__group-item card-quickview card-quickviewIcon">
                        <button class="quickview-icon" :title="loc.quickView" :data-product-id="product.id" data-open-quick-view-popup :data-product-handle="product.urlName">
                            <span class="visually-hidden" v-html="loc.quickView"></span>
                            <span class="text" v-html="loc.quickView"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999" aria-hidden="true" focusable="false" role="presentation" class="icon icon-eyes">
                                <path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
                                                        c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
                                                        C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
                                                        c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
                                                        C447.361,287.923,358.746,385.406,255.997,385.406z"></path>
                                <path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
                                                        s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
                                                        s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"></path>
                            </svg>
                        </button>
                    </div>
                    <!--compare-btn-->
                    <usf-compare-btn v-if="_usf_show_compare" :compareClass="'card-product__group-item card-compare card-compareIcon'" :product="product"></usf-compare-btn>
                </div>

                <!--item-size -->
                <usf-item-size v-if="_usfGlobalSettings.display_item_size && sizeOption && !isSoldOut && product.variants.length > 0" :product="product" :option="sizeOption" :optionIndex="sizeIndex" :productUrl="productUrl"></usf-item-size>

                <div v-if="_usfGlobalSettings.show_quick_view && _usfGlobalSettings.product_quick_view_type == 'default'" class="card-quickview">
                    <button class="quickview-button button" :title="loc.quickView" :data-product-id="product.id" data-open-quick-view-popup :data-product-handle="product.urlName">
                        <span class="visually-hidden" v-html="loc.quickView"></span>
                        <span v-html="loc.quickView"></span>
                    </button>
                </div>
                <template v-if="_usfGlobalSettings.show_product_marquee"></template>
            </div>
        </div>
        <div class="card-information">
            <div class="card-information__wrapper" :class="['text-' + _usfGlobalSettings.product_content_text_align]">
                <div v-if="_usfGlobalSettings.enable_custom_layout_card" class="card-review clearfix halo-productReview">
                    <!-- Product review -->
                    <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
                </div>

                <div v-if="_usfGlobalSettings.disable_product_card_border && _usfGlobalSettings.enable_custom_layout_card" class="wrapper-title-vendor" :class="{'card-title-ellipsis': _usfGlobalSettings.product_title_line_text != 'full'}">
                    <div v-if="_usfGlobalSettings.show_vendor && usf.settings.search.showVendor" class="card-vendor link-underline">
                        <span class="visually-hidden" v-html="window._usfVendorText"></span>
                        <a :href="usf.platform.baseUrl + '/collections/vendors?q=' + encodeURIComponent(product.vendor)" v-html="product.vendor"></a>
                    </div>
                    `+_usfProductCartTitle+`
                </div>
                <template v-else>
                    <div v-if="_usfGlobalSettings.show_vendor && usf.settings.search.showVendor" class="card-information__group card-information__group-2">
                        <div class="card-vendor link-underline">
                            <span class="visually-hidden" v-html="window._usfVendorText"></span>
                            <a :href="usf.platform.baseUrl + '/collections/vendors?q=' + encodeURIComponent(product.vendor)" v-html="product.vendor"></a>
                        </div>
                    </div>
                    `+_usfProductCartTitle+`
                </template>

                <div v-if="!_usfGlobalSettings.enable_custom_layout_card" class="card-review clearfix halo-productReview">
                    <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
                </div>
                <!--Description-->
                <div class="card-summary card-list__hidden" v-html="shortDescription"></div>

                <div class="card-price">
                    `+_usfPrice+`
                </div>
            </div>
            <!--color swatch-->
            <template v-if="colorOption">
                <div v-if="!_usfGlobalSettings.show_swatch" class="hidden">
                    <usf-product-swatch :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
                </div>
                <usf-product-swatch v-else :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
            </template>
            <!-- Swatch-->
            <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
            <span v-if="_usfGlobalSettings.display_text_size && sizeOption && sizeOption.values.length" class="text-size" :class="['text-' + _usfGlobalSettings.product_content_text_align]" v-html="window._usfMoreSizeTxt"></span>

            <div v-if="_usfGlobalSettings.enable_custom_layout_card" class="wrapper__card" :class="{'show-wishlist':_usf_show_wishlist,'show-mb': _usfGlobalSettings.show_wishlist_card_mb}">
                <div v-if="_usfGlobalSettings.show_action" class="card-action" :class="{'has-compare': _usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'}" v-html="gridAddToCartForm"></div>
                <div v-if="_usfGlobalSettings.show_action" class="usf-list-form" v-html="listAddToCartForm"></div>

                <div v-if="_usf_show_wishlist" class="card-product__group-item card-wishlist">
                    <button class="wishlist-icon" title="Add to wishlist" data-wishlist :data-wishlist-handle="product.urlName" :data-product-id="product.id">
                        <span class="visually-hidden" v-html="window._usfAddWishlistTxt"></span>
                        <span class="text" v-html="window._usfAddWishlistTxt"></span>
                        
                        <svg viewBox="0 0 512 512" class="icon icon-wishlist">
                            <g>
                                <g>
                                    <path d="M474.644,74.27C449.391,45.616,414.358,29.836,376,29.836c-53.948,0-88.103,32.22-107.255,59.25
                                                c-4.969,7.014-9.196,14.047-12.745,20.665c-3.549-6.618-7.775-13.651-12.745-20.665c-19.152-27.03-53.307-59.25-107.255-59.25
                                                c-38.358,0-73.391,15.781-98.645,44.435C13.267,101.605,0,138.213,0,177.351c0,42.603,16.633,82.228,52.345,124.7
                                                c31.917,37.96,77.834,77.088,131.005,122.397c19.813,16.884,40.302,34.344,62.115,53.429l0.655,0.574
                                                c2.828,2.476,6.354,3.713,9.88,3.713s7.052-1.238,9.88-3.713l0.655-0.574c21.813-19.085,42.302-36.544,62.118-53.431
                                                c53.168-45.306,99.085-84.434,131.002-122.395C495.367,259.578,512,219.954,512,177.351
                                                C512,138.213,498.733,101.605,474.644,74.27z M309.193,401.614c-17.08,14.554-34.658,29.533-53.193,45.646
                                                c-18.534-16.111-36.113-31.091-53.196-45.648C98.745,312.939,30,254.358,30,177.351c0-31.83,10.605-61.394,29.862-83.245
                                                C79.34,72.007,106.379,59.836,136,59.836c41.129,0,67.716,25.338,82.776,46.594c13.509,19.064,20.558,38.282,22.962,45.659
                                                c2.011,6.175,7.768,10.354,14.262,10.354c6.494,0,12.251-4.179,14.262-10.354c2.404-7.377,9.453-26.595,22.962-45.66
                                                c15.06-21.255,41.647-46.593,82.776-46.593c29.621,0,56.66,12.171,76.137,34.27C471.395,115.957,482,145.521,482,177.351
                                                C482,254.358,413.255,312.939,309.193,401.614z"></path>
                                </g>
                            </g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                        </svg>
                    </button>
                </div>
            </div>
            <template v-else>
                <div v-if="_usfGlobalSettings.show_action" class="card-action" :class="{'has-compare': _usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'}" v-html="gridAddToCartForm"></div>
                <div v-if="_usfGlobalSettings.show_action" class="usf-list-form" v-html="listAddToCartForm"></div>
                <div v-if="_usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'" class="card-compare-wrapper">
                    <usf-compare-btn :compareClass="'card-compare'" :product="product"></usf-compare-btn>
                </div>
            </template>
        </div>
    </div>
</div>`;
var _usfProductCard3 = `
<div class="product-item usf-card-3" :data-product-id="product.id" :data-json-product="dataJson" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave">
    <div class="card">
        <div :class="'card-product ' + (product.images.length ? '' : 'card--text-only card--soft')">
            <div class="card-product__wrapper">
                <usf-badges v-if="_usfGlobalSettings.show_badge" :sale="hasDiscount" :soldOut="isSoldOut" :product="product" :badgeClass="'card__badge'" :salePercent="salePercent" :loc="loc" :pIndex="pIndex"></usf-badges>

                <div class="card-media media--loading-effect" :class="['card-media--' + _usf_media_size,{'media--hover-effect': hoverImage && _usfGlobalSettings.show_image_swap}]"   :style="cardMediaStyle">
                    <!-- Labels -->
                    <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
                    <!-- Wishlist -->
                    <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
                    `+_usfImageProductCard+`
                    <a class="card-link" :href="productUrl" :title="product.title"></a>
                </div>

                <div v-if="_usf_show_quick_view || _usf_show_compare" :class="'card-product__group group-' + _usfGlobalSettings.group_quickview_wishlist">
                    <div v-if="_usf_show_quick_view" class="card-product__group-item card-quickview card-quickviewIcon" :class="{'show-mb': _usfGlobalSettings.show_quick_view_mb,'default':_usfGlobalSettings.product_quick_view_type == 'default'}">
                        <button class="quickview-icon" :title="loc.quickView" :data-product-id="product.id" data-open-quick-view-popup :data-product-handle="product.urlName">
                            <span class="visually-hidden" v-html="loc.quickView"></span>
                            <span class="text" v-html="loc.quickView"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999" aria-hidden="true" focusable="false" role="presentation" class="icon icon-eyes">
                                <path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
                                            c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
                                            C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
                                            c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
                                            C447.361,287.923,358.746,385.406,255.997,385.406z"></path>
                                <path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
                                            s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
                                            s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"></path>
                            </svg>
                        </button>
                    </div>
                    <div v-if="_usfGlobalSettings.show_wishlist_card_mb" class="card-product__group-item card-wishlist show-mb">
                        <button type="button" :title="_usfAddWishlistTxt" class="wishlist-icon" data-wishlist :data-wishlist-handle="product.urlName" :data-product-id="product.id">
                            <span class="visually-hidden" v-html="_usfAddWishlistTxt"></span>
                            <span class="text" v-html="_usfAddWishlistTxt">
                            </span>
                            <svg viewBox="0 0 512 512" class="icon icon-wishlist">
                                <g>
                                <g>
                                <path d="M474.644,74.27C449.391,45.616,414.358,29.836,376,29.836c-53.948,0-88.103,32.22-107.255,59.25
                                    c-4.969,7.014-9.196,14.047-12.745,20.665c-3.549-6.618-7.775-13.651-12.745-20.665c-19.152-27.03-53.307-59.25-107.255-59.25
                                    c-38.358,0-73.391,15.781-98.645,44.435C13.267,101.605,0,138.213,0,177.351c0,42.603,16.633,82.228,52.345,124.7
                                    c31.917,37.96,77.834,77.088,131.005,122.397c19.813,16.884,40.302,34.344,62.115,53.429l0.655,0.574
                                    c2.828,2.476,6.354,3.713,9.88,3.713s7.052-1.238,9.88-3.713l0.655-0.574c21.813-19.085,42.302-36.544,62.118-53.431
                                    c53.168-45.306,99.085-84.434,131.002-122.395C495.367,259.578,512,219.954,512,177.351
                                    C512,138.213,498.733,101.605,474.644,74.27z M309.193,401.614c-17.08,14.554-34.658,29.533-53.193,45.646
                                    c-18.534-16.111-36.113-31.091-53.196-45.648C98.745,312.939,30,254.358,30,177.351c0-31.83,10.605-61.394,29.862-83.245
                                    C79.34,72.007,106.379,59.836,136,59.836c41.129,0,67.716,25.338,82.776,46.594c13.509,19.064,20.558,38.282,22.962,45.659
                                    c2.011,6.175,7.768,10.354,14.262,10.354c6.494,0,12.251-4.179,14.262-10.354c2.404-7.377,9.453-26.595,22.962-45.66
                                    c15.06-21.255,41.647-46.593,82.776-46.593c29.621,0,56.66,12.171,76.137,34.27C471.395,115.957,482,145.521,482,177.351
                                    C482,254.358,413.255,312.939,309.193,401.614z"></path>
                                </g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                <g>
                                </g>
                                </svg>
                        </button>
                        </div>
                    <!--compare-btn-->
                    <usf-compare-btn v-if="_usf_show_compare" :compareClass="'card-product__group-item card-compare card-compareIcon'" :product="product"></usf-compare-btn>
                </div>

                <div class="card-group-abs-center">
                    <div v-if="_usf_show_wishlist" class="card-product__group-item card-wishlist">
                        <button class="wishlist-icon" title="Add to wishlist" data-wishlist :data-wishlist-handle="product.urlName" :data-product-id="product.id">
                            <span class="visually-hidden" v-html="window._usfAddWishlistTxt"></span>
                            <span class="text" v-html="window._usfAddWishlistTxt"></span>
                            <svg viewBox="0 0 512 512" class="icon icon-wishlist">
                                <g>
                                    <g>
                                        <path d="M474.644,74.27C449.391,45.616,414.358,29.836,376,29.836c-53.948,0-88.103,32.22-107.255,59.25
                                            c-4.969,7.014-9.196,14.047-12.745,20.665c-3.549-6.618-7.775-13.651-12.745-20.665c-19.152-27.03-53.307-59.25-107.255-59.25
                                            c-38.358,0-73.391,15.781-98.645,44.435C13.267,101.605,0,138.213,0,177.351c0,42.603,16.633,82.228,52.345,124.7
                                            c31.917,37.96,77.834,77.088,131.005,122.397c19.813,16.884,40.302,34.344,62.115,53.429l0.655,0.574
                                            c2.828,2.476,6.354,3.713,9.88,3.713s7.052-1.238,9.88-3.713l0.655-0.574c21.813-19.085,42.302-36.544,62.118-53.431
                                            c53.168-45.306,99.085-84.434,131.002-122.395C495.367,259.578,512,219.954,512,177.351
                                            C512,138.213,498.733,101.605,474.644,74.27z M309.193,401.614c-17.08,14.554-34.658,29.533-53.193,45.646
                                            c-18.534-16.111-36.113-31.091-53.196-45.648C98.745,312.939,30,254.358,30,177.351c0-31.83,10.605-61.394,29.862-83.245
                                            C79.34,72.007,106.379,59.836,136,59.836c41.129,0,67.716,25.338,82.776,46.594c13.509,19.064,20.558,38.282,22.962,45.659
                                            c2.011,6.175,7.768,10.354,14.262,10.354c6.494,0,12.251-4.179,14.262-10.354c2.404-7.377,9.453-26.595,22.962-45.66
                                            c15.06-21.255,41.647-46.593,82.776-46.593c29.621,0,56.66,12.171,76.137,34.27C471.395,115.957,482,145.521,482,177.351
                                            C482,254.358,413.255,312.939,309.193,401.614z"></path>
                                    </g>
                                </g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                            </svg>
                        </button>
                    </div>

                    <!--add to cart form-->
                    <div v-if="_usfGlobalSettings.show_action" class="card-action" v-html="gridAddToCartForm"></div>
                    <div class="card-review clearfix halo-productReview">
                        <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
                    </div>
                </div>
                <div class="card-group-abs-bottom">
                    <!--item-size -->
                    <usf-item-size v-if="_usfGlobalSettings.display_item_size && sizeOption && !isSoldOut && product.variants.length > 0" :product="product" :option="sizeOption" :optionIndex="sizeIndex" :productUrl="productUrl"></usf-item-size>
                    <div v-if="_usfGlobalSettings.show_quick_view && _usfGlobalSettings.product_quick_view_type == 'default'" class="card-quickview">
                        <button class="quickview-button button" :title="loc.quickView" :data-product-id="product.id" data-open-quick-view-popup :data-product-handle="product.urlName">
                            <span class="visually-hidden" v-html="loc.quickView"></span>
                            <span v-html="loc.quickView"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-information">
            <div class="card-information__wrapper" :class="['text-' + _usfGlobalSettings.product_content_text_align]">
                <div v-if="_usfGlobalSettings.show_vendor && usf.settings.search.showVendor" class="card-information__group card-information__group-2">
                    <div class="card-vendor">
                        <span class="visually-hidden" v-html="window._usfVendorText"></span>
                        <a :href="usf.platform.baseUrl + '/collections/vendors?q=' + encodeURIComponent(product.vendor)" v-html="product.vendor"></a>
                    </div>
                </div>

                `+_usfProductCartTitle+`

                <!--Description-->
                <div class="card-summary card-list__hidden" v-html="shortDescription"></div>

                <div class="card-price">
                    `+_usfPrice+`
                </div>
            </div>
            <!--color swatch-->
            <template v-if="colorOption">
                <div v-if="!_usfGlobalSettings.show_swatch" class="hidden">
                    <usf-product-swatch :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
                </div>
                <usf-product-swatch v-else :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
            </template>
            <!-- Swatch-->
            <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
            <span v-if="_usfGlobalSettings.display_text_size && sizeOption && sizeOption.values.length" class="text-size" :class="['text-' + _usfGlobalSettings.product_content_text_align]" v-html="window._usfMoreSizeTxt"></span>
            <!--list form-->
            <div v-if="_usfGlobalSettings.show_action" class="usf-list-form" v-html="listAddToCartForm"></div>
            <usf-compare-btn v-if="_usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'" :compareClass="'card-compare'" :product="product" :check="true"></usf-compare-btn>
        </div>
    </div>
</div>`;
var _usfProductCard4 = `
<div class="product-item usf-card-4" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :class="{'sold-out': isSoldOut,'has-notify': isSoldOut && _usfGlobalSettings.show_notify_form}" :data-product-id="product.id" :data-json-product="dataJson">
    <div class="card">
        <div :class="'card-product ' + (product.images.length ? '' : 'card--text-only card--soft')">
            <div class="card-product__wrapper">
                <usf-badges v-if="_usfGlobalSettings.show_badge" :sale="hasDiscount" :soldOut="isSoldOut" :product="product" :badgeClass="'card__badge'" :salePercent="salePercent" :loc="loc" :pIndex="pIndex"></usf-badges>

                <div class="card-media media--loading-effect" :class="['card-media--' + _usf_media_size,{'media--hover-effect': hoverImage && _usfGlobalSettings.show_image_swap}]"  :style="cardMediaStyle">
                    <!-- Labels -->
                    <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
                    <!-- Wishlist -->
                    <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
                    `+_usfImageProductCard+`
                    <a class="card-link" :href="productUrl" :title="product.title"></a>
                </div>
                <div v-if="_usf_show_quick_view  || _usf_show_compare" :class="'card-product__group group-' + _usfGlobalSettings.group_quickview_wishlist">
                    <div v-if="_usf_show_quick_view" class="card-product__group-item card-quickview card-quickviewIcon" :class="{'show-mb': _usfGlobalSettings.show_quick_view_mb,'default':_usfGlobalSettings.product_quick_view_type == 'default'}">
                        <button class="quickview-icon" :title="loc.quickView" :data-product-id="product.id" data-open-quick-view-popup :data-product-handle="product.urlName">
                            <span class="text" v-html="loc.quickView"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999" aria-hidden="true" focusable="false" role="presentation" class="icon icon-eyes">
                                <path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
                                            c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
                                            C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
                                            c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
                                            C447.361,287.923,358.746,385.406,255.997,385.406z"></path>
                                <path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
                                            s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
                                            s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"></path>
                            </svg>
                        </button>
                    </div>
                    <!--compare-btn-->
                    <usf-compare-btn v-if="_usf_show_compare" :compareClass="'card-product__group-item card-compare card-compareIcon'" :product="product"></usf-compare-btn>
                </div>

                <!--item-size -->
                <usf-item-size v-if="_usfGlobalSettings.display_item_size && sizeOption && !isSoldOut && product.variants.length > 0" :product="product" :option="sizeOption" :optionIndex="sizeIndex" :productUrl="productUrl"></usf-item-size>

                <div v-if="_usfGlobalSettings.show_quick_view && _usfGlobalSettings.product_quick_view_type == 'default'" class="card-quickview">
                    <button class="quickview-button button" :title="loc.quickView" :data-product-id="product.id" data-open-quick-view-popup :data-product-handle="product.urlName" v-html="loc.quickView"></button>
                </div>

                <div v-if="_usfGlobalSettings.show_action || _usf_show_wishlist" class="card-action">
                    <div v-if="_usfGlobalSettings.show_action" class="usf-card-action" v-html="gridAddToCartForm"></div>
                    <div class="card-action-bottom" :class="[{'has-wishlist':_usf_show_wishlist,'show-mb': _usfGlobalSettings.show_wishlist_card_mb},'text-' + _usfGlobalSettings.product_content_text_align]">
                        <div v-if="_usf_show_wishlist" class="card-product__group-item card-wishlist">
                            <button class="wishlist-icon" title="Add to wishlist" data-wishlist :data-wishlist-handle="product.urlName" :data-product-id="product.id">
                                <svg viewBox="0 0 512 512" class="icon icon-wishlist">
                                    <g>
                                        <g>
                                            <path d="M474.644,74.27C449.391,45.616,414.358,29.836,376,29.836c-53.948,0-88.103,32.22-107.255,59.25
                                                                c-4.969,7.014-9.196,14.047-12.745,20.665c-3.549-6.618-7.775-13.651-12.745-20.665c-19.152-27.03-53.307-59.25-107.255-59.25
                                                                c-38.358,0-73.391,15.781-98.645,44.435C13.267,101.605,0,138.213,0,177.351c0,42.603,16.633,82.228,52.345,124.7
                                                                c31.917,37.96,77.834,77.088,131.005,122.397c19.813,16.884,40.302,34.344,62.115,53.429l0.655,0.574
                                                                c2.828,2.476,6.354,3.713,9.88,3.713s7.052-1.238,9.88-3.713l0.655-0.574c21.813-19.085,42.302-36.544,62.118-53.431
                                                                c53.168-45.306,99.085-84.434,131.002-122.395C495.367,259.578,512,219.954,512,177.351
                                                                C512,138.213,498.733,101.605,474.644,74.27z M309.193,401.614c-17.08,14.554-34.658,29.533-53.193,45.646
                                                                c-18.534-16.111-36.113-31.091-53.196-45.648C98.745,312.939,30,254.358,30,177.351c0-31.83,10.605-61.394,29.862-83.245
                                                                C79.34,72.007,106.379,59.836,136,59.836c41.129,0,67.716,25.338,82.776,46.594c13.509,19.064,20.558,38.282,22.962,45.659
                                                                c2.011,6.175,7.768,10.354,14.262,10.354c6.494,0,12.251-4.179,14.262-10.354c2.404-7.377,9.453-26.595,22.962-45.66
                                                                c15.06-21.255,41.647-46.593,82.776-46.593c29.621,0,56.66,12.171,76.137,34.27C471.395,115.957,482,145.521,482,177.351
                                                                C482,254.358,413.255,312.939,309.193,401.614z"></path>
                                        </g>
                                    </g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                    <g></g>
                                </svg>
                                <span class="text" v-html="window._usfAddWishlistTxt"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-information">
            <div :class="'card-information__wrapper text-' + _usfGlobalSettings.product_content_text_align">
                <div v-if="(_usfGlobalSettings.show_vendor && usf.settings.search.showVendor) || _usfGlobalSettings.show_review" class="card-information__group card-information__group-2" :class="{'has-review': _usfGlobalSettings.show_review}">
                    <div v-if="_usfGlobalSettings.show_vendor && usf.settings.search.showVendor" class="card-vendor">
                        <span class="visually-hidden" v-html="window._usfVendorText"></span>
                        <a :href="usf.platform.baseUrl + '/collections/vendors?q=' + encodeURIComponent(product.vendor)" v-html="product.vendor"></a>
                    </div>

                    <div v-if="_usfGlobalSettings.show_review" class="card-review clearfix halo-productReview">
                        <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
                    </div>
                </div>

                <h3 class="card__heading">
                    <a class="card-title link-underline" :class="{'card-title-ellipsis': _usfGlobalSettings.product_title_line_text != 'full', 'card-title-change': product.selectedVariantId}" :href="'/products/' + product.urlName" :data-product-title="product.title" :data-product-url="'/products/' + product.urlName">
                            <span v-html="product.title"></span>
                    </a>
                </h3>

                <!--Description-->
                <div class="card-summary card-list__hidden" v-html="shortDescription"></div>

                <div class="card-price">
                    `+_usfPrice+`
                </div>
            </div>

            <!--color swatch-->
            <template v-if="colorOption">
                <div v-if="!_usfGlobalSettings.show_swatch" class="hidden">
                    <usf-product-swatch :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
                </div>
                <usf-product-swatch v-else :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
            </template>
            <!-- Swatch-->
            <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
            <span v-if="_usfGlobalSettings.display_text_size && sizeOption && sizeOption.values.length" class="text-size" :class="['text-' + _usfGlobalSettings.product_content_text_align]" v-html="window._usfMoreSizeTxt"></span>
            <!--list form-->
            <div v-if="_usfGlobalSettings.show_action" class="usf-list-form" v-html="listAddToCartForm"></div>
            <usf-compare-btn v-if="_usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'" :compareClass="'card-compare'" :product="product" :check="true"></usf-compare-btn>
        </div>
    </div>
</div>`;
var _usfProductCard5 = `
<div class="product-item usf-card-5"  @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :class="{'sold-out': isSoldOut,'has-notify': isSoldOut && _usfGlobalSettings.show_notify_form}" :data-product-id="product.id" :data-json-product="dataJson">
    <div class="card">
        <div :class="'card-product ' + (product.images.length ? '' : 'card--text-only card--soft')">
            <div class="card-product__wrapper">
                <usf-badges v-if="_usfGlobalSettings.show_badge" :sale="hasDiscount" :soldOut="isSoldOut" :product="product" :badgeClass="'card__badge'" :salePercent="salePercent" :loc="loc" :pIndex="pIndex"></usf-badges>

                <div class="card-media media--loading-effect" :class="['card-media--' + _usf_media_size,{'media--hover-effect': hoverImage && _usfGlobalSettings.show_image_swap,'has-compare': _usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'}]"  :style="cardMediaStyle">
                    <!-- Labels -->
                    <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
                    <!-- Wishlist -->
                    <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
                    `+_usfImageProductCard+`
                    <a class="card-link" :href="productUrl" :title="product.title"></a>
                </div>

                <!--product_action_group-->
                <div v-if="_usf_show_quick_view || _usf_show_compare" :class="'card-product__group group-' + _usfGlobalSettings.group_quickview_wishlist">
                    
                    <div v-if="_usf_show_quick_view" class="card-product__group-item card-quickview card-quickviewIcon">
                        <button class="quickview-icon" :title="loc.quickView" :data-product-id="product.id" data-open-quick-view-popup :data-product-handle="product.urlName">
                            <span class="text" v-html="loc.quickView"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999" aria-hidden="true" focusable="false" role="presentation" class="icon icon-eyes">
                                <path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
                                        c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
                                        C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
                                        c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
                                        C447.361,287.923,358.746,385.406,255.997,385.406z"></path>
                                <path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
                                        s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
                                        s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"></path>
                            </svg>
                        </button>
                    </div>
                    <!--compare-btn-->
                    <usf-compare-btn v-if="_usf_show_compare" :compareClass="'card-product__group-item card-compare card-compareIcon'" :product="product"></usf-compare-btn>
                </div>

                <!--item-size -->
                <usf-item-size v-if="_usfGlobalSettings.display_item_size && sizeOption && !isSoldOut && product.variants.length > 0" :product="product" :option="sizeOption" :optionIndex="sizeIndex" :productUrl="productUrl"></usf-item-size>

                <div v-if="_usfGlobalSettings.show_quick_view && _usfGlobalSettings.product_quick_view_type == 'default'" class="card-quickview">
                    <button class="quickview-button button" :title="loc.quickView" :data-product-id="product.id" data-open-quick-view-popup :data-product-handle="product.urlName" v-html="loc.quickView"></button>
                </div>

                <div v-if=" _usfGlobalSettings.show_compare ||  _usfGlobalSettings.show_action" class="card-action" :class="{'has-compare': _usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'}">
                    <div v-if="_usfGlobalSettings.show_action" class="usf-card-action" v-html="gridAddToCartForm"></div>
                    <div class="card-action-bottom">
                        <usf-compare-btn v-if="_usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'" :compareClass="'card-compare'" :product="product" :check="true"></usf-compare-btn>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-information" :class="{'has-wishlist':_usf_show_wishlist}">
            <div class="card-information__wrapper" :class="['text-' + _usfGlobalSettings.product_content_text_align]">
                <div v-if="(_usfGlobalSettings.show_vendor && usf.settings.search.showVendor) || _usf_show_wishlist" class="card-information__group card-information__group-2" :class="{'has-wishlist':_usf_show_wishlist}">
                    <div v-if="_usfGlobalSettings.show_vendor && usf.settings.search.showVendor" class="card-vendor">
                        <span class="visually-hidden" v-html="window._usfVendorText"></span>
                        <a :href="usf.platform.baseUrl + '/collections/vendors?q=' + encodeURIComponent(product.vendor)" v-html="product.vendor"></a>
                    </div>
                    <div v-if="_usf_show_wishlist" class="card-product__group-item card-wishlist">
                        <button class="wishlist-icon" title="Add to wishlist" data-wishlist :data-wishlist-handle="product.urlName" :data-product-id="product.id">
                            <svg viewBox="0 0 512 512" class="icon icon-wishlist">
                                <g>
                                    <g>
                                        <path d="M474.644,74.27C449.391,45.616,414.358,29.836,376,29.836c-53.948,0-88.103,32.22-107.255,59.25
                                                                c-4.969,7.014-9.196,14.047-12.745,20.665c-3.549-6.618-7.775-13.651-12.745-20.665c-19.152-27.03-53.307-59.25-107.255-59.25
                                                                c-38.358,0-73.391,15.781-98.645,44.435C13.267,101.605,0,138.213,0,177.351c0,42.603,16.633,82.228,52.345,124.7
                                                                c31.917,37.96,77.834,77.088,131.005,122.397c19.813,16.884,40.302,34.344,62.115,53.429l0.655,0.574
                                                                c2.828,2.476,6.354,3.713,9.88,3.713s7.052-1.238,9.88-3.713l0.655-0.574c21.813-19.085,42.302-36.544,62.118-53.431
                                                                c53.168-45.306,99.085-84.434,131.002-122.395C495.367,259.578,512,219.954,512,177.351
                                                                C512,138.213,498.733,101.605,474.644,74.27z M309.193,401.614c-17.08,14.554-34.658,29.533-53.193,45.646
                                                                c-18.534-16.111-36.113-31.091-53.196-45.648C98.745,312.939,30,254.358,30,177.351c0-31.83,10.605-61.394,29.862-83.245
                                                                C79.34,72.007,106.379,59.836,136,59.836c41.129,0,67.716,25.338,82.776,46.594c13.509,19.064,20.558,38.282,22.962,45.659
                                                                c2.011,6.175,7.768,10.354,14.262,10.354c6.494,0,12.251-4.179,14.262-10.354c2.404-7.377,9.453-26.595,22.962-45.66
                                                                c15.06-21.255,41.647-46.593,82.776-46.593c29.621,0,56.66,12.171,76.137,34.27C471.395,115.957,482,145.521,482,177.351
                                                                C482,254.358,413.255,312.939,309.193,401.614z"></path>
                                    </g>
                                </g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                            </svg>
                            <span class="visually-hidden" v-html="window._usfAddWishlistTxt"></span>
                        </button>
                    </div>
                </div>

                <!--color swatch-->
                <template v-if="colorOption">
                    <div v-if="!_usfGlobalSettings.show_swatch" class="hidden">
                        <usf-product-swatch :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
                    </div>
                    <usf-product-swatch v-else :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
                </template>
                <!-- Swatch-->
                <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>

                <h3 class="card__heading">
                    <a class="card-title link-underline" :class="{'card-title-ellipsis': _usfGlobalSettings.product_title_line_text != 'full', 'card-title-change': product.selectedVariantId}" :href="'/products/' + product.urlName" :data-product-title="product.title" :data-product-url="'/products/' + product.urlName">
                            <span v-html="product.title"></span>
                    </a>
                </h3>

                <div class="card-price">
                    `+_usfPrice+`
                </div>

                <div class="card-information__group">
                    <div v-if="_usfGlobalSettings.show_review" class="card-review clearfix halo-productReview">
                        <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
                    </div>
                    <span v-if="_usfGlobalSettings.display_text_size && sizeOption && sizeOption.values.length" class="text-size" :class="['text-' + _usfGlobalSettings.product_content_text_align]" v-html="window._usfMoreSizeTxt"></span>
                </div>

                <!--Description-->
                <div class="card-summary card-list__hidden" v-html="shortDescription"></div>

                <div class="card-price card-list__hidden">
                    `+_usfPrice+`
                </div>

                <div class="card-list__hidden">
                    <!--color swatch-->
                    <template v-if="colorOption">
                        <div v-if="!_usfGlobalSettings.show_swatch" class="hidden">
                            <usf-product-swatch :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
                        </div>
                        <usf-product-swatch v-else :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
                    </template>
                    <!-- Swatch-->
                    <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
                </div>

                <!--list form-->
                <div v-if="_usfGlobalSettings.show_action" class="usf-list-form" v-html="listAddToCartForm"></div>
                <div v-if="_usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'" class="card-compare-wrapper card-list__hidden">
                    <usf-compare-btn :compareClass="''" :product="product"></usf-compare-btn>
                </div>
            </div>
        </div>
    </div>
</div>`;
var _usfProductCard6 = `
<div class="product-item usf-card-6"  @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" :class="{'disable_product_card_border': _usfGlobalSettings.disable_product_card_border}" :data-product-id="product.id" :data-json-product="dataJson">
    <div class="card">
        <div :class="'card-product ' + (product.images.length ? '' : 'card--text-only card--soft')">
            <div class="card-product__wrapper">
                <usf-badges v-if="_usfGlobalSettings.show_badge" :sale="hasDiscount" :soldOut="isSoldOut" :product="product" :badgeClass="'card__badge'" :salePercent="salePercent" :loc="loc" :pIndex="pIndex"></usf-badges>

                <div class="card-media media--loading-effect" :class="['card-media--' + _usf_media_size,{'media--hover-effect': hoverImage && _usfGlobalSettings.show_image_swap,'has-compare': _usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'}]"  :style="cardMediaStyle">
                    <!-- Labels -->
                    <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
                    <!-- Wishlist -->
                    <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
                    `+_usfImageProductCard+`
                    <a class="card-link" :href="productUrl" :title="product.title"></a>
                </div>

                <!--product_action_group-->
                <div v-if="_usf_show_quick_view || _usf_show_compare" :class="'card-product__group group-' + _usfGlobalSettings.group_quickview_wishlist">
                    <div v-if="_usf_show_wishlist" class="card-product__group-item card-wishlist">
                        <button class="wishlist-icon" title="Add to wishlist" data-wishlist :data-wishlist-handle="product.urlName" :data-product-id="product.id">
                            <span class="visually-hidden" v-html="window._usfAddWishlistTxt"></span>
                            <span class="text" v-html="window._usfAddWishlistTxt"></span>
                            <svg viewBox="0 0 512 512" class="icon icon-wishlist">
                                <g>
                                    <g>
                                        <path d="M474.644,74.27C449.391,45.616,414.358,29.836,376,29.836c-53.948,0-88.103,32.22-107.255,59.25
                                    c-4.969,7.014-9.196,14.047-12.745,20.665c-3.549-6.618-7.775-13.651-12.745-20.665c-19.152-27.03-53.307-59.25-107.255-59.25
                                    c-38.358,0-73.391,15.781-98.645,44.435C13.267,101.605,0,138.213,0,177.351c0,42.603,16.633,82.228,52.345,124.7
                                    c31.917,37.96,77.834,77.088,131.005,122.397c19.813,16.884,40.302,34.344,62.115,53.429l0.655,0.574
                                    c2.828,2.476,6.354,3.713,9.88,3.713s7.052-1.238,9.88-3.713l0.655-0.574c21.813-19.085,42.302-36.544,62.118-53.431
                                    c53.168-45.306,99.085-84.434,131.002-122.395C495.367,259.578,512,219.954,512,177.351
                                    C512,138.213,498.733,101.605,474.644,74.27z M309.193,401.614c-17.08,14.554-34.658,29.533-53.193,45.646
                                    c-18.534-16.111-36.113-31.091-53.196-45.648C98.745,312.939,30,254.358,30,177.351c0-31.83,10.605-61.394,29.862-83.245
                                    C79.34,72.007,106.379,59.836,136,59.836c41.129,0,67.716,25.338,82.776,46.594c13.509,19.064,20.558,38.282,22.962,45.659
                                    c2.011,6.175,7.768,10.354,14.262,10.354c6.494,0,12.251-4.179,14.262-10.354c2.404-7.377,9.453-26.595,22.962-45.66
                                    c15.06-21.255,41.647-46.593,82.776-46.593c29.621,0,56.66,12.171,76.137,34.27C471.395,115.957,482,145.521,482,177.351
                                    C482,254.358,413.255,312.939,309.193,401.614z"></path>
                                    </g>
                                </g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                            </svg>
                        </button>
                    </div>
                    <div v-if="_usf_show_quick_view" class="card-product__group-item card-quickview card-quickviewIcon">
                        <button class="quickview-icon" :title="loc.quickView" :data-product-id="product.id" data-open-quick-view-popup :data-product-handle="product.urlName">
                            <span class="text" v-html="loc.quickView"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999" aria-hidden="true" focusable="false" role="presentation" class="icon icon-eyes">
                                <path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
                                        c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
                                        C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
                                        c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
                                        C447.361,287.923,358.746,385.406,255.997,385.406z"></path>
                                <path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
                                        s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
                                        s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"></path>
                            </svg>
                        </button>
                    </div>
                    <!--compare-btn-->
                    <usf-compare-btn v-if="_usf_show_compare" :compareClass="'card-product__group-item card-compare card-compareIcon'" :product="product"></usf-compare-btn>
                </div>

                <!--item-size -->
                <usf-item-size v-if="_usfGlobalSettings.display_item_size && sizeOption && !isSoldOut && product.variants.length > 0" :product="product" :option="sizeOption" :optionIndex="sizeIndex" :productUrl="productUrl"></usf-item-size>

                <div v-if="_usfGlobalSettings.show_quick_view && _usfGlobalSettings.product_quick_view_type == 'default'" class="card-quickview">
                    <button class="quickview-button button" :title="loc.quickView" :data-product-id="product.id" data-open-quick-view-popup :data-product-handle="product.urlName" v-html="loc.quickView"></button>
                </div>


            </div>
        </div>
        <div v-if=" _usfGlobalSettings.show_action" class="card-action card-grid__hidden" :class="{'has-compare': _usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'}" data-cart-action-for-quickshop-2 v-html="gridAddToCartForm"></div>
        <div class="card-information">
            <div class="card-information__wrapper" :class="['text-' + _usfGlobalSettings.product_content_text_align]">
                <!--vendor-->
                <div v-if="_usfGlobalSettings.show_vendor && usf.settings.search.showVendor" class="card-vendor link-underline">
                    <span class="visually-hidden" v-html="window._usfVendorText"></span>
                    <a :href="usf.platform.baseUrl + '/collections/vendors?q=' + encodeURIComponent(product.vendor)" v-html="product.vendor"></a>
                </div>
                <h3 class="card__heading">
                    <a class="card-title link-underline" :class="{'card-title-ellipsis': _usfGlobalSettings.product_title_line_text != 'full', 'card-title-change': product.selectedVariantId}" :href="'/products/' + product.urlName" :data-product-title="product.title" :data-product-url="'/products/' + product.urlName">
                            <span v-html="product.title"></span>
                    </a>
                </h3>
                <!--reviews-->
                <div v-if="_usfGlobalSettings.show_review" class="card-review clearfix halo-productReview">
                    <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
                </div>
                <div class="card-summary card-list__hidden" v-html="shortDescription"></div>
                <div class="card-price">
                    `+_usfPrice+`
                </div>
            </div>
            <!--color swatch-->
            <template v-if="colorOption">
                <div v-if="!_usfGlobalSettings.show_swatch" class="hidden">
                    <usf-product-swatch :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
                </div>
                <usf-product-swatch v-else :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
            </template>
            <!-- Swatch-->
            <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
            <span v-if="_usfGlobalSettings.display_text_size && sizeOption && sizeOption.values.length" class="text-size" :class="['text-' + _usfGlobalSettings.product_content_text_align]" v-html="window._usfMoreSizeTxt"></span>
            <div v-if="_usfGlobalSettings.show_action" class="usf-list-form" v-html="listAddToCartForm"></div>
            <div v-if="_usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'" class="card-compare-wrapper">
                <usf-compare-btn :compareClass="'card-compare'" :product="product"></usf-compare-btn>
            </div>
        </div>
    </div>
</div>`;
var _usfProductCard7 = `
<div class="product-item usf-card-7" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave"  :class="{'enable_background_button_card': _usfGlobalSettings.enable_background_button_card}" :data-product-id="product.id" :data-json-product="dataJson">
    <div class="card">
        <div :class="'card-product ' + (product.images.length ? '' : 'card--text-only card--soft')">
            <div class="card-product__wrapper">
                <usf-badges v-if="_usfGlobalSettings.show_badge" :sale="hasDiscount" :soldOut="isSoldOut" :product="product" :badgeClass="'card__badge'" :salePercent="salePercent" :loc="loc" :pIndex="pIndex"></usf-badges>

                <div class="card-media media--loading-effect" :class="['card-media--' + _usf_media_size,{'media--hover-effect': hoverImage && _usfGlobalSettings.show_image_swap,'has-compare': _usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'}]" :style="cardMediaStyle">
                    <!-- Labels -->
                    <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
                    <!-- Wishlist -->
                    <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
                    `+_usfImageProductCard+`
                    <a class="card-link" :href="productUrl" :title="product.title"></a>
                </div>

                <!--product_action_group-->
                <div v-if="_usf_show_quick_view || _usf_show_compare" :class="['card-product__group group-' + _usfGlobalSettings.group_quickview_wishlist,{'has-size':_usfGlobalSettings.display_item_size}]">
                    <div v-if="_usf_show_wishlist" class="card-product__group-item card-wishlist">
                        <button class="wishlist-icon" title="Add to wishlist" data-wishlist :data-wishlist-handle="product.urlName" :data-product-id="product.id">
                            <span class="text" v-html="window._usfAddWishlistTxt"></span>
                            <svg viewBox="0 0 512 512" class="icon icon-wishlist">
                                <g>
                                    <g>
                                        <path d="M474.644,74.27C449.391,45.616,414.358,29.836,376,29.836c-53.948,0-88.103,32.22-107.255,59.25
                                    c-4.969,7.014-9.196,14.047-12.745,20.665c-3.549-6.618-7.775-13.651-12.745-20.665c-19.152-27.03-53.307-59.25-107.255-59.25
                                    c-38.358,0-73.391,15.781-98.645,44.435C13.267,101.605,0,138.213,0,177.351c0,42.603,16.633,82.228,52.345,124.7
                                    c31.917,37.96,77.834,77.088,131.005,122.397c19.813,16.884,40.302,34.344,62.115,53.429l0.655,0.574
                                    c2.828,2.476,6.354,3.713,9.88,3.713s7.052-1.238,9.88-3.713l0.655-0.574c21.813-19.085,42.302-36.544,62.118-53.431
                                    c53.168-45.306,99.085-84.434,131.002-122.395C495.367,259.578,512,219.954,512,177.351
                                    C512,138.213,498.733,101.605,474.644,74.27z M309.193,401.614c-17.08,14.554-34.658,29.533-53.193,45.646
                                    c-18.534-16.111-36.113-31.091-53.196-45.648C98.745,312.939,30,254.358,30,177.351c0-31.83,10.605-61.394,29.862-83.245
                                    C79.34,72.007,106.379,59.836,136,59.836c41.129,0,67.716,25.338,82.776,46.594c13.509,19.064,20.558,38.282,22.962,45.659
                                    c2.011,6.175,7.768,10.354,14.262,10.354c6.494,0,12.251-4.179,14.262-10.354c2.404-7.377,9.453-26.595,22.962-45.66
                                    c15.06-21.255,41.647-46.593,82.776-46.593c29.621,0,56.66,12.171,76.137,34.27C471.395,115.957,482,145.521,482,177.351
                                    C482,254.358,413.255,312.939,309.193,401.614z"></path>
                                    </g>
                                </g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                                <g></g>
                            </svg>
                        </button>
                    </div>
                    <div v-if="_usf_show_quick_view" class="card-product__group-item card-quickview card-quickviewIcon">
                        <button class="quickview-icon" :title="loc.quickView" :data-product-id="product.id" data-open-quick-view-popup :data-product-handle="product.urlName">
                            <span class="text" v-html="loc.quickView"></span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999" aria-hidden="true" focusable="false" role="presentation" class="icon icon-eyes">
                                <path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
                                        c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
                                        C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
                                        c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
                                        C447.361,287.923,358.746,385.406,255.997,385.406z"></path>
                                <path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
                                        s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
                                        s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"></path>
                            </svg>
                        </button>
                    </div>
                    <!--compare-btn-->
                    <usf-compare-btn v-if="_usf_show_compare" :compareClass="'card-product__group-item card-compare card-compareIcon'" :product="product"></usf-compare-btn>
                </div>

                <!--item-size -->
                <usf-item-size v-if="_usfGlobalSettings.display_item_size && sizeOption && !isSoldOut && product.variants.length > 0" :product="product" :option="sizeOption" :optionIndex="sizeIndex" :productUrl="productUrl"></usf-item-size>
                <template v-if="_usfGlobalSettings.show_action" class="card-action">
                    <div v-if="!(_usfGlobalSettings.show_quick_view && _usfGlobalSettings.product_quick_view_type == 'default')" v-html="gridAddToCartForm" :class="{'has-compare': _usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'}"></div>
                    <div v-else :class="{'has-compare': _usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'}">
                        <div  class="card-quickview above-button">
                            <button class="quickview-button button" :title="loc.quickView" :data-product-id="product.id" data-open-quick-view-popup :data-product-handle="product.urlName" v-html="loc.quickView"></button>
                        </div>
                        <div class="usf-card-action" v-html="gridAddToCartForm"></div>
                    </div>
                </template>
                
                <usf-compare-btn v-if="_usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'" :compareClass="'card-compare'" :product="product" :check="true"></usf-compare-btn>
            </div>
        </div>
        <div class="card-information">
            <div class="card-information__wrapper" :class="['text-' + _usfGlobalSettings.product_content_text_align]">
                <!--vendor-->
                <div v-if="_usfGlobalSettings.show_vendor && usf.settings.search.showVendor" class="card-information__group card-information__group-2">
                    <div class="card-vendor">
                        <span class="visually-hidden" v-html="window._usfVendorText"></span>
                        <a :href="usf.platform.baseUrl + '/collections/vendors?q=' + encodeURIComponent(product.vendor)" v-html="product.vendor"></a>
                    </div>
                </div>
                <h3 class="card__heading">
                    <a class="card-title link-underline" :class="{'card-title-ellipsis': _usfGlobalSettings.product_title_line_text != 'full', 'card-title-change': product.selectedVariantId}" :href="'/products/' + product.urlName" :data-product-title="product.title" :data-product-url="'/products/' + product.urlName">
                            <span v-html="product.title"></span>
                    </a>
                </h3>
                <!--reviews-->
                <div v-if="_usfGlobalSettings.show_review" class="card-review clearfix halo-productReview">
                    <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
                </div>
                <div class="card-summary card-list__hidden" v-html="shortDescription"></div>
                <div class="card-price">
                    `+_usfPrice+`
                </div>
            </div>
            <!--color swatch-->
            <template v-if="colorOption">
                <div v-if="!_usfGlobalSettings.show_swatch" class="hidden">
                    <usf-product-swatch :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
                </div>
                <usf-product-swatch v-else :product="product" :option="colorOption" :optionIndex="colorIndex"></usf-product-swatch>
            </template>
            <!-- Swatch-->
            <usf-plugin name="searchResultsProductSwatch" :data="pluginData"></usf-plugin>
            <span v-if="_usfGlobalSettings.display_text_size && sizeOption && sizeOption.values.length" class="text-size" :class="['text-' + _usfGlobalSettings.product_content_text_align]" v-html="window._usfMoreSizeTxt"></span>
            <div v-if="_usfGlobalSettings.show_action" class="usf-list-form" v-html="listAddToCartForm"></div>
            <div v-if="_usfGlobalSettings.show_compare && _usfGlobalSettings.product_compare_type == 'default'" class="card-compare-wrapper card-list__hidden">
                <usf-compare-btn :compareClass="'card-compare'" :product="product"></usf-compare-btn>
            </div>
        </div>
    </div>
</div>`;
var _usfFilterBodyTemplate = /*inc_begin_filter-body*/
`<!-- Range filter -->
<div v-if="isRange" class="usf-facet-values usf-facet-range">
    <!-- Range inputs -->
    <div class="usf-slider-inputs usf-clear">
        <span class="usf-slider-input__from">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[0]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[0], 0)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
        <span class="usf-slider-div">-</span>
        <span class="usf-slider-input__to">
            <span class="usf-slider-input__prefix" v-html="facet.sliderPrefix" v-if="facet.showSliderInputPrefixSuffix"></span>
            <input :readonly="!hasRangeInputs" :value="rangeConverter(range[1]).toFixed(rangeDecimals)" @change="e => onRangeInput(e, range[1], 1)">
            <span class="usf-slider-input__suffix" v-html="facet.sliderSuffix" v-if="facet.showSliderInputPrefixSuffix"></span>
        </span>
    </div>
	<!-- See API reference of this component at https://docs.sobooster.com/search/storefront-js-api/slider-component -->
    <usf-slider :color="facet.sliderColor" :symbols="facet.sliderValueSymbols" :prefix="facet.sliderPrefix" :suffix="facet.sliderSuffix" :min="facet.min" :max="facet.max" :pips="facet.range[0]" :step="facet.range[1]" :decimals="rangeDecimals" :value="range" :converter="rangeConverter" @input="onRangeSliderInput" @change="onRangeSliderChange"></usf-slider>
</div>
<!-- List + Swatch filter -->
<div v-else ref="values" :class="'usf-facet-values usf-scrollbar usf-facet-values--' + facet.display + (facet.navigationCollections ? ' usf-navigation' : '') + (facet.valuesTransformation ? (' usf-' + facet.valuesTransformation.toLowerCase()) : '') + (facet.circleSwatch ? ' usf-facet-values--circle' : '')" :style="!usf.isMobileFilter && facet.maxHeight ? { maxHeight: facet.maxHeight } : null">
    <!-- Filter options -->                
    <usf-filter-option v-for="o in visibleOptions" :facet="facet" :option="o" :key="o.id ? o.id : o.label+'_'+o.min+'_'+o.max"></usf-filter-option>
</div>

<!-- More -->
<div v-if="isMoreVisible" class="usf-more" @click="onShowMore" v-html="loc.more"></div>`
/*inc_end_filter-body*/;

var _usfSearchResultsSkeletonItemTpl = /*inc_begin_search-skeleton-item*/
`<div v-if="view === 'grid'" class="usf-sr-product usf-skeleton">
    <div class="usf-img"></div>
    <div class="usf-meta"></div>
</div>
<div class="usf-sr-product usf-skeleton" v-else>
    <!-- Image column -->
    <div class="usf-img-column">
        <div class="usf-img"></div>
    </div>

    <!-- Info column -->
    <div class="usf-info-column">
        <div class="usf-title"></div>
        <div class="usf-vendor"></div>
        <div class="usf-price-wrapper"></div>
    </div>
</div>`
/*inc_end_search-skeleton-item*/;

var _usfSearchResultsSummaryTpl = /*inc_begin_search-summary*/
`<span class="usf-sr-summary" v-html="loader === true ? '&nbsp;' : usf.utils.format(term ? loc.productSearchResultWithTermSummary : loc.productSearchResultSummary, result.total, usf.utils.encodeHtml(term))"></span>`
/*inc_end_search-summary*/;

var _usfSearchResultsViewsTpl = 
`<toolbar-item v-if="_usf_collection_layout != 'express_order'" class="toolbar" data-toolbar="" >
<div class="toolbar-wrapper">
    <div class="toolbar-col toolbar-colLeft">
        <div class="toolbar-item toolbar-viewAs clearfix" data-view-as="">
            <span class="toolbar-icon icon-mode icon-mode-list" data-col="1" role="button" aria-label="List" tabindex="0" :class="{'active': view === 'list'}" @click.prevent.stop="onNewListViewClick"></span>
            <span class="toolbar-icon icon-mode icon-mode-grid grid-2" data-col="2" role="button" aria-label="Grid 2" tabindex="0" :class="{'active': view === 'grid' && layout == 2}" @click.prevent.stop="onNewGridViewClick(2)"></span>
            <span class="toolbar-icon icon-mode icon-mode-grid grid-3" data-col="3" role="button" aria-label="Grid 3" tabindex="0" :class="{'active': view === 'grid' && layout == 3}" @click.prevent.stop="onNewGridViewClick(3)"></span>
            <span class="toolbar-icon icon-mode icon-mode-grid grid-4" data-col="4" role="button" aria-label="Grid 4" tabindex="0" :class="{'active': view === 'grid' && layout == 4}" @click.prevent.stop="onNewGridViewClick(4)"></span>
            <span class="toolbar-icon icon-mode icon-mode-grid grid-5" data-col="5" role="button" aria-label="Grid 5" tabindex="0" :class="{'active': view === 'grid' && layout == 5}" @click.prevent.stop="onNewGridViewClick(5)"></span>
        </div>
    </div>
</div>
<div class="toolbar-wrapper toolbar-mobile">
    <div class="toolbar-item toolbar-viewAs clearfix" data-view-as-mobile="">
        <span class="toolbar-icon icon-mode icon-mode-list" data-col="1" role="button" aria-label="List" tabindex="0" :class="{'active': view === 'list'}" @click.prevent.stop="onNewListViewClick"></span>
        <span class="toolbar-icon icon-mode icon-mode-grid grid-2" data-col="2" role="button" aria-label="Grid 2" tabindex="0" :class="{'active': view === 'grid' && layout == 2}" @click.prevent.stop="onNewGridViewClick(2)"></span>
        <span class="toolbar-icon icon-mode icon-mode-grid grid-3" data-col="3" role="button" aria-label="Grid 3" tabindex="0" :class="{'active': view === 'grid' && layout == 3}" @click.prevent.stop="onNewGridViewClick(3)"></span>
        <span class="toolbar-icon icon-mode icon-mode-grid grid-4" data-col="4" role="button" aria-label="Grid 4" tabindex="0" :class="{'active': view === 'grid' && layout == 4}" @click.prevent.stop="onNewGridViewClick(4)"></span>
        <span class="toolbar-icon icon-mode icon-mode-grid grid-5" data-col="5" role="button" aria-label="Grid 5" tabindex="0" :class="{'active': view === 'grid' && layout == 5}" @click.prevent.stop="onNewGridViewClick(5)"></span>
    </div>
</div>
</toolbar-item>`
;

var _usfSearchResultsSortByTpl = /*inc_begin_search-sortby*/
`<usf-dropdown :placeholder="loc.sort" :value="sortBy" :options="sortByOptions" @input="onSortByChanged"></usf-dropdown>`
/*inc_end_search-sortby*/;

usf.templates = {
    // application
    app: 
`<div id="usf_container" class="usf-zone usf-clear" :class="{'usf-filters-horz': usf.settings.filters.horz}">
    <template v-if="hasFilters">
        <new-filters class="usf-sr-filters"></new-filters>
    </template>
    <usf-new-sr></usf-new-sr>
</div>`
,

    // search results
    searchResults: `
<div class="usf-sr-container" :class="{'usf-no-facets': noFacets, 'usf-empty': !loader && !hasResults, 'usf-nosearch': !showSearchBox}">
    <!-- Search form -->
    <form v-if="showSearchBox" action="/search" method="get" role="search" class="usf-sr-inputbox">
        <button type="submit" class="usf-icon usf-icon-search usf-btn"></button>
        <input name="q" autocomplete="off" ref="searchInput" v-model="termModel">
        <button v-if="termModel" class="usf-remove usf-btn" @click.prevent.stop="clearSearch"></button>
    </form>

    <div class="usf-sr-config" v-if="usf.isMobile">
        <div class="usf-sr-config__mobile-filters-wrapper">
            <div class="usf-filters" :class="{'usf-has-filters': !!facetFilters}" @click="onMobileToggle">
                <button class="usf-btn" v-html="loc.filters"></button>
            </div>
            ` + _usfSearchResultsSortByTpl + `
        </div>
        
        ` + _usfSearchResultsSummaryTpl + _usfSearchResultsViewsTpl + `
    </div>
    <div class="usf-sr-config" v-else>
        ` + _usfSearchResultsViewsTpl + _usfSearchResultsSummaryTpl + _usfSearchResultsSortByTpl + `
    </div>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && !result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Load previous -->
    <div id="usf-sr-top-loader" :class="{'usf-with-loader':loader === 'prev'}" v-if="(loader === 'prev' || itemsOffset) && loader !== true && hasResults && usf.settings.search.more !== 'page'"></div>
    <template v-if="_usf_collection_layout == 'express_order'" >
        <div class="express-order-header t-header">
            <h4 class="column col-img col-title text-center" v-html="_usfImageTxt"></h4>        
            <h4 class="column col-prod col-title" v-html="_usfProductTxt"></h4>
            <h4 class="column col-price col-title text-center" v-html="_usfPriceTxt"></h4>
            <h4 class="column col-qtt col-title text-center" v-html="_usfQtyTxt"></h4>
            <h4 class="column col-options col-title text-center" v-html="_usfOptionsTxt"></h4>
        </div>
        <div :class="\'productListing express-order-content t-body product-collection usf-results usf-\' + view">
            <template v-if="0 || loader===true">` + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl +
            `</template>
            <template v-else>
                <template v-if="hasResults">
                    <template v-for="(p,index) in result.items">
                        <usf-express-order-griditem :product="p" :result="result" :pIndex="index" :key="p.id"></usf-express-order-griditem>
                    </template>
                </template>
                <template v-else>
                    <!-- Empty result -->
                    <div class="usf-sr-empty">
                        <div class="usf-icon"></div>
                        <span v-html="term ? usf.utils.format(loc.productSearchNoResults, term) : loc.productSearchNoResultsEmptyTerm"></span>
                        <button v-if="facetFilters" class="usf-btn usf-btn-action" v-html="loc.clearAllFilters" @click="usf.queryRewriter.removeAllFacetFilters"></button>
                    </div>
                </template>
            </template>
        </div>
    </template>
    <ul v-else :class="(view === \'grid\' ? gridWrapClass : listWrapClass) + \' usf-results usf-\' + view">
        <template v-if="0 || loader===true">` + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl + _usfSearchResultsSkeletonItemTpl +
        `</template>
        <template v-else>
            <template v-if="hasResults">
                <template v-for="(p,index) in result.items">
                    <usf-banner v-if="_usfShowBanner(index,1)" :order="1"></usf-banner>
                    <usf-banner v-if="_usfShowBanner(index,2)" :order="2"></usf-banner>
                    <usf-banner v-if="_usfShowBanner(index,3)" :order="3"></usf-banner>
                    <usf-ella-griditem :product="p" :data-index="index" :pIndex="index" :result="result" :key="p.id"></usf-ella-griditem>
                </template>
            </template>
            <template v-else>
                <!-- Empty result -->
                <div class="usf-sr-empty">
                    <div class="usf-icon"></div>
                    <span v-html="term ? usf.utils.format(loc.productSearchNoResults, term) : loc.productSearchNoResultsEmptyTerm"></span>
                    <button v-if="facetFilters" class="usf-btn usf-btn-action" v-html="loc.clearAllFilters" @click="usf.queryRewriter.removeAllFacetFilters"></button>
                </div>
            </template>
        </template>
    </ul>

    <usf-sr-banner v-if="result && result.extra && result.extra.banner && result.extra.banner.isBottom" :banner="result.extra.banner"></usf-sr-banner>

    <!-- Paging & load more -->
    <div class="usf-sr-paging" v-if="loader !== true">
        <div class="usf-sr-more" v-if="hasResults && usf.settings.search.more === 'more'">
            <div class="usf-title" v-html="usf.utils.format(loc.youHaveViewed, itemsLoaded, result.total)"></div>
            <div class="usf-progress">
                <div :style="{width: (itemsLoaded * 100 / result.total) + '%'}"></div>
            </div>
            <button v-if="itemsLoaded < result.total" class="usf-load-more" :class="{'usf-with-loader': loader === 'more'}" @click="onLoadMore"><span v-html="loc.loadMore"></span></button>
        </div>
        <usf-sr-pages v-else-if="hasResults && usf.settings.search.more === 'page'" :page="page" :pages-total="pagesTotal" :pages-to-display="4" :side-pages-to-display="1"></usf-sr-pages>
        <div class="usf-sr-loader usf-with-loader" v-else-if="loader === 'more'"></div>
    </div>
</div>
`,
    // Grid view item
    searchResultsGridViewItem: `
<li class="product" :class="{'product-masonry-item': _usf_collection_layout == 'masonry' && usf.platform.collection}" :product-selector="product.id" :data-usf-pid="product.id">
    <template v-if="_usfGlobalSettings.product_card_layout == '02'">`+_usfProductCard2 +`</template>
    <template v-else-if="_usfGlobalSettings.product_card_layout == '03'">`+_usfProductCard3 +`</template>
    <template v-else-if="_usfGlobalSettings.product_card_layout == '04'">`+_usfProductCard4 +`</template>
    <template v-else-if="_usfGlobalSettings.product_card_layout == '05'">`+_usfProductCard5 +`</template>
    <template v-else-if="_usfGlobalSettings.product_card_layout == '06'">`+_usfProductCard6 +`</template>
    <template v-else-if="_usfGlobalSettings.product_card_layout == '07'">`+_usfProductCard7 +`</template>
    <template v-else>`+_usfProductCard +`</template>
</li>
`,
expressOrderGridViewItem: `<div class="product grid-item" :product-selector="product.id" :data-usf-pid="product.id">
<div class="inner product-item" :class="{'sold-out':isSoldOut,'on-sale': hasDiscount}" :data-product-id="'product-' + product.id">
    <div class="inner-top">
        <div class="column col-img text-center">
            <div class="product-top">
                <div class="product-image" :class="{'image-swap': hoverImage && _usfGlobalSettings.image_swap}">
                    <a :href="productUrl" @click="onItemClick" @mouseover="onItemHover" @mouseleave="onItemLeave" class="product-grid-image" :data-collections-related="'/collections/' + (usf.platform.collection ? usf.platform.collection : 'all') + '?view=related'">
                        <img :src="selectedImageUrl" :alt="selectedImage.alt" class="lazyload" :class="{'images-one': hoverImage && _usfGlobalSettings.image_swap}" :data-src="selectedImageUrl" :data-widths="'['+_usfImageWidths+']'" :data-aspectratio="_usfGetImageRatio(selectedImage)" data-sizes="auto">

                        <span v-if="hoverImage && _usfGlobalSettings.image_swap" class="images-two">
                            <img :src="hoverImageUrl" :alt="hoverImage.alt" class="lazyload" :data-src="hoverImageUrl" :data-widths="'['+_usfImageWidths+']'" :data-aspectratio="_usfGetImageRatio(hoverImage)" data-sizes="auto">
                        </span>
                        <!-- Wishlist -->
                        <usf-plugin name="searchResultsProductWishList" :data="pluginData"></usf-plugin>
                        <!-- Labels -->
                        <usf-plugin name="searchResultsProductLabel" :data="pluginData"></usf-plugin>
                    </a>
                    <!--badges-->
                    <usf-badges v-if="_usfGlobalSettings.show_badge" :sale="hasDiscount" :soldOut="isSoldOut" :product="product" :badgeClass="'card__badge'" :salePercent="salePercent" :loc="loc" :pIndex="pIndex"></usf-badges>
                </div>
            </div>
        </div>
        <div class="column col-prod">
            <div v-if="_usfGlobalSettings.show_vendor && usf.settings.search.showVendor" class="product-vendor">
                <a :href="usf.platform.baseUrl + '/collections/vendors?q=' + encodeURIComponent(product.vendor)" v-html="product.vendor"></a>
            </div>
            <a class="product-title" :href="productUrl">
                <span class="text" v-html="product.title"></span>
            </a>
            <!-- Product review -->
            <usf-plugin name="searchResultsProductReview" :data="pluginData"></usf-plugin>
        </div>
        <div class="column col-price text-center">
            <div class="card-price">
                `+_usfPrice+`
            </div>
        </div>
        <div class="column col-qtt text-center">
            <div v-if="product.variants.length == 1" class="qty-group">
                <a href="#" data-minus-quantity class="minus button"></a>
                <input type="number" :id="'quantity__' + product.id" name="quantity" value="1" min="1">
                <a href="#" data-plus-quantity class="plus button"></a>
            </div>
        </div>
        <div class="column col-options text-center">
            <form :action="usf.platform.addToCartUrl" method="post" class="variants" :data-id="'product-actions-' + product.id" enctype="multipart/form-data">
                <button v-if="isSoldOut" class="button add-to-cart-btn" type="submit" disabled="disabled" v-html="loc.soldOut"></button>
                <template v-else>
                    <a v-if="product.variants.length > 1" data-toggle-variant :data-target="'#product-options-' + product.id" class="button button--primary show-options-btn" :href="productUrl" :title="product.title" v-html="window._usfShowVariantsTxt"></a>
                    <template v-else>
                        <input type="hidden" name="id" :value="selectedVariantForPrice.id" />
                        <button data-express-addToCart class="button button--primary add-to-cart-btn" type="submit" v-html="loc.addToCart"></button>
                    </template>
                </template>
            </form>
            <div class="feedback-text" style="display:none;"></div>
        </div>
    </div>
</div>

<div class="product-options" :id="'product-options-' + product.id">
    <div v-for="v in product.variants" class="options-items" :id="'variant-' + v.id">
        <div class="column col-img text-center"></div>

        <div class="column col-prod">
            <img v-if="product.images[v.imageIndex]" :src="_usfGetOriginImgWithSize(product.images[v.imageIndex].url,'56x')" :alt="product.images[v.imageIndex].alt">
            <img v-else :src="selectedImageUrl" :alt="selectedImage.alt">
            <span class="options-title" v-html="getVariantTitle(v.options,product)"></span>
        </div>

        <div class="column col-price text-center">
            <div class="card-price">
                `+_usfVariantPrice+`
            </div>
        </div>

        <div class="column col-qtt text-center">
            <div class="qty-group">
                <a href="#" data-minus-quantity class="minus button"></a>
                <input type="number" :id="'variant_' + v.id" name="quantity" value="1" min="1">
                <a href="#" data-plus-quantity class="plus button"></a>
            </div>
        </div>

        <div class="column col-options text-center">
            <form :action="usf.platform.addToCartUrl" method="post" class="variants" :data-id="'product-actions-' + v.id" enctype="multipart/form-data">
                <button v-if="usf.utils.isVariantSoldOut(v)" class="button button--primary add-to-cart-btn" type="submit" disabled="disabled" v-html="loc.soldOut"></button>
                <template v-else>
                    <button data-express-addToCart class="button button--primary add-to-cart-btn" :id="v.id" type="submit" v-html="loc.addToCart"></button>
                    <input type="hidden" name="id" :value="v.id" />
                </template>
            </form>
            <div class="feedback-text" style="display:none;"></div>
        </div>
    </div>
</div>
</div>`,

    // Search result pages
    searchResultsPages: `
    <center>
    <ul class="pagination__list list-unstyled">
        <template v-for="e in elements">
            <li v-if="e.type === 'prev'" class="pagination-arrow">
                <a href="javascript:void(0)" :title="loc.prevPage" @click="onPrev" class="pagination__item pagination__item--prev pagination__item-arrow link motion-reduce" aria-label="Prev">
                    <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z">
                   </path></svg>
                </a>
            </li>
            <li v-else-if="e.type === 'dots'" class="pagination-num"><span class="pagination__item">…</span></li>
            <li v-else-if="e.type === 'page' && e.current" class="pagination-num"><span class="pagination__item pagination__item--current" aria-current="page" :aria-label="e.page">{{e.page}}</span></li>
            <li v-else-if="e.type === 'page' && !e.current" class="pagination-num"><a href="javascript:void(0)" class="pagination__item link" @click="ev=>onPage(e.page,ev)" :title="usf.utils.format(loc.gotoPage,e.page)" :aria-label="e.page">{{e.page}}</a></li>
            <li v-else-if="e.type === 'next'" class="pagination-arrow">
                <a href="javascript:void(0)" :title="loc.nextPage" @click="onNext" class="pagination__item pagination__item--next pagination__item-arrow link motion-reduce" aria-label="Next">
                    <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-caret" viewBox="0 0 10 6">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z">
                   </path></svg>
                </a>
            </li>
        </template>
    </ul>
</center>
`,
    // List view item
    searchResultsListViewItem: ``,
    // AddToCart Plugin	
    addToCartPlugin: 
``
,

    // Preview Plugin
    previewPlugin: ``,

    previewPluginModal:``,

    searchResultsBanner: /*inc_begin_search-banner*/        
`<div class="usf-sr-banner">
    <a :href="banner.url || 'javascript:void(0)'" :alt="banner.description">
        <img :src="banner.mediaUrl" style="max-width:100%">
    </a>
</div>
`
/*inc_end_search-banner*/,

    ////////////////////////
    // Filter templates
    // facet filters breadcrumb
    filtersBreadcrumb: /*inc_begin_filters-breadcrumb*/
`<div v-if="usf.settings.filterNavigation.showFilterArea && root.facetFilters && root.facets && facetFilterIds.length" class="usf-refineby">
    <!-- Breadcrumb Header -->
    <div class="usf-title usf-clear">
        <span class="usf-pull-left usf-icon usf-icon-equalizer"></span>
        <span class="usf-label" v-html="loc.filters"></span>

        <!-- Clear all -->
        <button class="usf-clear-all usf-btn" v-html="loc.clearAll" @click.prevent.stop="root.removeAllFacetFilters" :aria-label="loc.clearAllFilters"></button>
    </div>

    <!-- Breadcrumb Values -->
    <div class="usf-refineby__body">
        <template v-for="facetId in facetFilterIds" v-if="(facet = root.facets.find(fc => fc.id === facetId)) && (f = root.facetFilters[facetId])">
            <template v-for="queryValStr in f[1]">
                <div class="usf-refineby__item usf-pointer usf-clear" @click.prevent.stop="root.removeFacetFilter(facetId, queryValStr)">
                    <button class="usf-btn"><span class="usf-filter-label" v-html="facet.title + ': '"></span><b v-html="root.formatBreadcrumbLabel(facet, f[0], usf.utils.encodeHtml(queryValStr))"></b></button><span class="usf-remove"></span>
                </div>
            </template>
        </template>
    </div>
 </div>`
 /*inc_end_filters-breadcrumb*/,

    // facet filters    
    filters: /*inc_begin_filters*/
// Vert & Horz modes have different render order
`<div class="usf-facets usf-no-select usf-zone" :class="{'usf-facets--mobile':usf.isMobileFilter}">
<!-- Mobile view -->
<template v-if="usf.isMobile">
    <div class="usf-close" @click="onMobileBack(1)"></div>
    <div class="usf-facets-wrapper">
        <!-- Header. shows 'Filters', facet name, etc. -->
        <div class="usf-header">
            <!-- Single facet mode -->
            <template v-if="isSingleFacetMode">
                <div class="usf-title" @click="onMobileBack(0)" v-html="facets[0].title"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clear"></div>
            </template>

            <!-- When a filter is selected -->
            <template v-else-if="mobileSelectedFacet">
                <div class="usf-title usf-back" @click="onMobileBack(0)" v-html="mobileSelectedFacet.title"></div>
                <div v-if="facetFilters && facetFilters[mobileSelectedFacet.id]" class="usf-clear" @click="removeFacetFilter(mobileSelectedFacet.id)" v-html="loc.clear"></div>
                <div v-else-if="mobileSelectedFacet.multiple" class="usf-all" @click="selectFacetFilter(mobileSelectedFacet)" v-html="loc.all"></div>
            </template>

            <!-- When no filter is selected -->
            <template v-else>
                <div class="usf-title" @click="onMobileBack(0)" v-html="loc.filters"></div>
                <div v-if="facetFilters" class="usf-clear" @click="removeAllFacetFilters" v-html="loc.clearAll"></div>
            </template>
        </div>

        <div class="usf-body">
            <!-- Desktop-like filter in mobile -->
            <template v-if="usf.settings.filters.desktopLikeMobile">
                <usf-filter-breadcrumb></usf-filter-breadcrumb>
                
                <!-- Facets body -->
                <div class="usf-facets__body">
                    <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
                </div>
            </template>
            
            <!-- Mobile filter -->
            <template v-else>
                <!-- List all filter options, in single facet mode -->
                <usf-filter v-if="isSingleFacetMode" :facet="facets[0]"></usf-filter>

                <!-- List all filter options, when a filter is selected -->
                <usf-filter v-else-if="mobileSelectedFacet" :facet="mobileSelectedFacet"></usf-filter>

                <!-- List all when there are more than one facet -->
                <template v-else v-for="f in facets">
                    <template v-if="canShowFilter(f)">
                        <div :key="f.id" class="usf-facet-value" @click="onMobileSelectFacet(f)">
                            <span class="usf-title" v-html="f.title"></span>
                            <div v-if="(selectedFilterOptionValues = facetFilters && (ff = facetFilters[f.id]) ? ff[1] : null)" class="usf-dimmed">
                                <span v-for="cf in selectedFilterOptionValues" v-html="formatBreadcrumbLabel(f, f.facetName, cf)"></span>
                            </div>
                        </div>
                    </template>
                </template>
            </template>
        </div>

        <!-- View items -->
        <div class="usf-footer">
            <div @click="onMobileBack(1)" v-html="loc.viewItems"></div>
        </div>
    </div>
</template>

<!-- Desktop view -->
<template v-else>
    <usf-filter-breadcrumb></usf-filter-breadcrumb>
    <!-- Filters Loader -->
    <div v-if="!facets" class="usf-facets__first-loader">
        <template v-for="i in 3">
            <div class="usf-facet"><div class="usf-title usf-no-select"><span class="usf-label"></span></div>
                <div v-if="!usf.settings.filters.horz" class="usf-container"><div class="usf-facet-values usf-facet-values--List"><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div><div class="usf-relative usf-facet-value usf-facet-value-single"><span class="usf-label"></span><span class="usf-value"></span></div></div></div>
            </div>
        </template>
    </div>
    <!-- Facets body -->
    <div v-else class="usf-facets__body">
        <usf-filter :facet="f" :key="f.id" v-for="f in facets"></usf-filter>
    </div>
</template>
</div>`
/*inc_end_filters*/,

    // facet filter item
    filter: /*inc_begin_filter*/
`<div v-if="canShow" class="usf-facet" :class="{'usf-collapsed': collapsed && !usf.isMobileFilter, 'usf-has-filter': isInBreadcrumb}">
    <!-- Mobile filter -->
    <div v-if="usf.isMobileFilter" class="usf-container">
        <!-- Search box -->
        <input v-if="hasSearchBox" class="usf-search-box" :aria-label="loc.filterOptions" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

        <!-- Values -->
        ` + _usfFilterBodyTemplate +
    `</div>

    <!-- Desktop filter -->
    <template v-else>
        <!-- Filter title -->
        <div class="usf-clear">
            <div class="usf-title usf-no-select" @click.prevent.stop="onExpandCollapse">
                <button class="usf-label usf-btn" v-html="facet.title" :aria-label="usf.utils.format(loc.filterBy,facet.title)" :aria-expanded="!collapsed"></button>
                <usf-helptip v-if="facet.tooltip" :tooltip="facet.tooltip"></usf-helptip>            
                <!-- 'Clear all' button to clear the current facet filter. -->
                <button v-if="isInBreadcrumb" class="usf-clear-all usf-btn" :title="loc.clearFilterOptions" :aria-label="usf.utils.format(loc.clearFiltersBy,facet.title)" @click.prevent.stop="onClear" v-html="loc.clear"></button>
                <span class="usf-pm"></span>
            </div>
        </div>

        <!-- Filter body -->
        <div class="usf-container">
            <!-- Search box -->
            <input v-if="hasSearchBox" class="usf-search-box" :placeholder="loc.filterOptions" :value="term" @input="v => term = v.target.value">

            ` + _usfFilterBodyTemplate +
        `
        </div>
    </template>
</div>`
/*inc_end_filter*/,

    // facet filter option
    filterOption: /*inc_begin_filter-option*/
`<div v-if="children" :class="(isSelected ? 'usf-selected ' : '') + ' usf-relative usf-facet-value usf-facet-value-single usf-with-children' + (collapsed ? ' usf-collapsed' : '')">
    <!-- option label -->
    <button class="usf-pm usf-btn" aria-label="Toggle children" v-if="children" @click.prevent.stop="onToggleChildren"></button>
    <button class="usf-label usf-btn" v-html="label" @click.prevent.stop="onToggle"></button>

    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>    

    <div class="usf-children-container" v-if="children && !collapsed">
        <button :class="'usf-child-item usf-btn usf-facet-value' + (isChildSelected(c) ? ' usf-selected' : '')" v-for="c in children" v-html="getChildLabel(c)" @click="onChildClick(c)"></button>
    </div>
</div>
<button v-else :class="(isSelected ? 'usf-selected ' : '') + (swatchImage ? ' usf-facet-value--with-background' : '') + ' usf-btn usf-relative usf-facet-value usf-facet-value-' + (facet.multiple ? 'multiple' : 'single')" :title="isSwatch || isBox ? label + ' (' + option.value + ')' : undefined" :style="usf.isMobileFilter ? null : swatchStyle" @click.prevent.stop="onToggle">
    <!-- checkbox -->
    <div v-if="!isBox && !isSwatch && facet.multiple" :class="'usf-checkbox' + (isSelected ? ' usf-checked' : '')">
        <span class="usf-checkbox-inner"></span>
    </div>

    <!-- swatch image in mobile -->
    <div v-if="swatchImage && usf.isMobileFilter" class="usf-mobile-swatch" :style="swatchStyle"></div>

    <!-- option label -->
    <span class="usf-label usf-btn" v-html="label"></span>
    
    <!-- product count -->
    <span v-if="!(!usf.settings.filterNavigation.showProductCount || (swatchImage && !usf.isMobileFilter)) && option.value !== undefined" class="usf-value">{{option.value}}</span>
</button>`
/*inc_end_filter-option*/,

    // Instant search popup
    instantSearch: /*inc_begin_instantsearch*/
`<div :class="'usf-popup usf-zone usf-is usf-is--compact usf-is--' + position + (shouldShow ? '' : ' usf-hide') + (isEmpty ? ' usf-empty' : '') + (hasProductsOnly ? ' usf-is--products-only' : '') + (firstLoader ? ' usf-is--first-loader': '')"  :style="usf.isMobile ? null : {left: this.left + 'px',top: this.top + 'px',width: this.width + 'px'}">
    <!-- Mobile search box -->
    <div v-if="usf.isMobile">
        <form class="usf-is-inputbox" :action="searchUrl" method="get" role="search">
            <span class="usf-icon usf-icon-back usf-close" @click="usf.utils.hideInstantSearch"></span>
            <input name="q" autocomplete="off" ref="searchInput" :value="term" @input="onSearchBoxInput">
            <span class="usf-remove" v-if="term" @click="onClear"></span>
        </form>
    </div>

    <!-- First loader -->
    <div class="usf-is-first-loader" v-if="firstLoader">
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
        <div class="usf-clear">
            <div class="usf-img"></div>
            <div class="usf-title"></div>
            <div class="usf-subtitle"></div>
        </div>
    </div>

    <!-- All JS files loaded -->
    <template v-else>
        <!-- Empty view -->
        <div v-if="isEmpty" class="usf-is-no-results">
            <div style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-items.png?t=2') center no-repeat;min-height:160px"></div>
            <div v-html="usf.utils.format(loc.noMatchesFoundFor, usf.utils.encodeHtml(term))"></div>
        </div>
        <template v-else>
            <!-- Body content -->
            <div class="usf-is-content">
                <!-- Products -->
                <div class="usf-is-matches usf-is-products">
                    <div class="usf-title" v-html="queryOrTerm ? loc.productMatches : loc.trending"></div>
                    
                    <div class="usf-is-list" v-if="result.items.length">
                        <!-- Did you mean -->
                        <span class="usf-is-did-you-mean" v-html="usf.utils.format(loc.didYouMean, usf.utils.encodeHtml(term), result.query)" v-if="termDiffers"></span>

                        <!-- Product -->
                        <usf-is-item v-for="p in result.items" :product="p" :result="result" :key="p.id + '-' + p.selectedVariantId"></usf-is-item>
                    </div>
                    <div class="usf-is-list" v-else style="background:url('//cdn.shopify.com/s/files/1/0257/0108/9360/t/85/assets/no-products.png?t=2') center no-repeat;min-height:250px"></div>
                </div>

                <div class="usf-is-side">
                    <!-- Suggestions -->
                    <div class="usf-is-matches usf-is-suggestions" v-if="result.suggestions && result.suggestions.length">
                        <div class="usf-title" v-html="loc.searchSuggestions"></div>
                        <button v-for="s in result.suggestions" class="usf-is-match usf-btn" v-html="usf.utils.highlight(s, result.query)" @click="search(s)"></button>
                    </div>

                    <!-- Collections -->
                    <div class="usf-is-matches usf-is-collections" v-if="result.collections && result.collections.length">
                        <div class="usf-title" v-html="loc.collections"></div>
                        <button v-for="c in result.collections" class="usf-is-match usf-btn" v-html="usf.utils.highlight(c.title, result.query)" @click="selectCollection(c)"></button>
                    </div>

                    <!-- Pages -->
                    <div class="usf-is-matches usf-is-pages" v-if="result.pages && result.pages.length">
                        <div class="usf-title" v-html="loc.pages"></div>
                        <button v-for="p in result.pages" class="usf-is-match usf-btn" v-html="usf.utils.highlight(p.title, result.query)" @click="selectPage(p)"></button>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="usf-is-viewall">
                <button class="usf-btn" @click="search(queryOrTerm)" v-html="usf.utils.format(queryOrTerm ? loc.viewAllResultsFor : loc.viewAllResults, usf.utils.encodeHtml(queryOrTerm))"></button>
            </div>
        </template>
    </template>
</div>`
/*inc_end_instantsearch*/
,

    // Instant search item
    instantSearchItem:/*inc_begin_instantsearch-item*/
`<div class="usf-is-product usf-clear" @click="onItemClick">
    <!-- Image -->
    <div class="usf-img-wrapper usf-pull-left">
        <img class="usf-img" :src="selectedImageUrl" :alt="selectedImage.alt">
    </div>
    
    <div class="usf-pull-left">
        <!-- Title -->
        <button class="usf-title usf-btn" v-html="usf.utils.highlight(product.title, result.query)"></button>

        <!-- Vendor -->
        <div class="usf-vendor" v-html="product.vendor" v-if="usf.settings.search.showVendor"></div>

        <!-- Prices -->
        <div class="usf-price-wrapper">
            <span class="usf-price" :class="{ 'usf-has-discount': hasDiscount }" v-html="displayPrice"></span>
            <span v-if="hasDiscount" class="usf-discount" v-html="displayDiscountedPrice"></span>
        </div>
    </div>
</div>`
/*inc_end_instantsearch-item*/,

    gridItemBadges: `<div v-if="showSoldOut || showSale || showCustomBadge || showBundleBadge || showNewBadge || customMetafieldBadge" class="halo-productBadges" :class="[badgeClass,'badge-' + _usfGlobalSettings.badge_postion,'halo-productBadges--' + _usfGlobalSettings.badge_postion]" :data-new-badge-number="_usfGlobalSettings.new_badge_limit">
    <span v-if="showNewBadge" class="badge new-badge" aria-hidden="true" v-html="_usfNewText"></span>
    <span v-if="showSale" class="badge sale-badge" aria-hidden="true" v-html="_usfGlobalSettings.sale_badge_type  == 'discount' ? '-' + salePercent + '%' : loc.sale"></span>
    <span v-if="showSoldOut" class="badge sold-out-badge" aria-hidden="true" v-html="loc.soldOut"></span>
    <span v-if="showCustomBadge" class="badge custom-badge" aria-hidden="true" v-html="_usfCustomBadgeTxt"></span>
    <span v-if="showBundleBadge" class="badge bundle-badge" aria-hidden="true" v-html="_usfBundleTxt"></span>
    <span v-if="customMetafieldBadge" class="badge custom-metafield-badge" aria-hidden="true" v-html="customMetafieldBadge"></span>
</div>`,
compareBtn: `<div :class="compareClass" data-product-compare :data-product-compare-handle="product.urlName" :data-product-compare-id="product.id">
    <div :class="window._usf_compare_class">
        <input :id="compareId" class="compare-checkbox" type="checkbox" name="compare" :value="product.urlName" />
        <label class="compare-label" :class="{'form-label--checkbox': _usfGlobalSettings.product_compare_type == 'default'}" :for="compareId">
            <span class="visually-hidden" v-html="window._usfCompareTitle"></span>
            <template v-if="_usfGlobalSettings.product_compare_type == 'icon'">
                <span :class="_usfGlobalSettings.product_card_layout == '04' ? 'text_1' : 'text'">
                    <span v-html="window._usfCompareTitle"></span>
                    <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="random" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="icon icon-compare">
                        <path d="M0 128v-8c0-6.6 5.4-12 12-12h105.8c3.3 0 6.5 1.4 8.8 3.9l89.7 97-21.8 23.6L109 140H12c-6.6 0-12-5.4-12-12zm502.6 278.6l-64 64c-20.1 20.1-54.6 5.8-54.6-22.6v-44h-25.7c-3.3 0-6.5-1.4-8.8-3.9l-89.7-97 21.8-23.6L367 372h17v-52c0-28.5 34.5-42.7 54.6-22.6l64 64c12.5 12.5 12.5 32.7 0 45.2zm-19.8-25.4l-64-64c-2.5-2.5-6.8-.7-6.8 2.8v128c0 3.6 4.3 5.4 6.8 2.8l64-64c1.6-1.5 1.6-4.1 0-5.6zm19.8-230.6l-64 64c-20.1 20.1-54.6 5.8-54.6-22.6v-52h-17L126.6 400.1c-2.3 2.5-5.5 3.9-8.8 3.9H12c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h97l240.4-260.1c2.3-2.5 5.5-3.9 8.8-3.9H384V64c0-28.5 34.5-42.7 54.6-22.6l64 64c12.5 12.5 12.5 32.7 0 45.2zm-19.8-25.4l-64-64c-2.5-2.5-6.8-.7-6.8 2.8v128c0 3.6 4.3 5.4 6.8 2.8l64-64c1.6-1.5 1.6-4.1 0-5.6z"></path>
                    </svg>
                </span>
            </template>
            <span v-else v-html="window._usfCompareTitle"></span>
        </label>
    </div>
</div>`,
ellaBanner: `<li class="product banner" data-product-banner="3" :data-first-position="position">
    <div class="grid-item banner-img">
      <a class="animate-scale" :href="link">
            <img v-if="imgUrl && imgUrl !=''" v-bind="imgAttrs"  alt="" loading="lazy">
            <div v-else class="not_img" style="--height_not_img: 560px">420 x 560px</div>  
      </a>
    </div>
</li>`,
};

usf.event.add('init', function () {    
	// register or override components
    // ...    
    /*var SearchResultsGridItem2 = {
        template: usf.templates.searchResultsGridViewItem,
    }
    usf.register(SearchResultsGridItem2, usf.components.SearchResultsGridItem, "usf-sr-griditem");*/
    _usfImageWidths = _usfIsDynamicImage ? [165, 170, 185, 198, 210, 220, 245, 270, 290, 320, 355, 360, 370, 420, 430, 460, 470, 510, 523, 533, 534, 570, 640, 665, 670, 720, 775, 785, 870, 930, 935, 940, 1066, 1160, 1170, 1270, 1370, 1570, 1770, 1850, 1880, 1903, 1920] : [usf.settings.search.imageSize];

    _usfSetDefaultThemeSettings();

    var NewSearchResults = {
        mixins: [usf.components.SearchResults],
        template: usf.templates.searchResults,
        data(){
            var l = parseInt(_usfLayout)
            return {
                staticClass: 'productListing list-unstyled list-' + _usfLayout + (_usf_collection_layout == 'masonry' && usf.platform.collection ? ' halo-row halo-row--masonry' : '' ),
                layout: l == 1 || usf.isMobile ? 2 : l
            }
        },
        created(){ 
            if(window.innerWidth <= 1600 && this.layout > 4){
                this.layout = 4;
            }
            if(window.innerWidth <= 992 && this.layout > 3){
                this.layout = 3;
            }
            if(window.innerWidth <= 768 && this.layout > 2){
                this.layout = 2;
            } 
        }, 
        methods:{
            onNewGridViewClick(col){
                this.layout = col;
                this.onGridViewClick();
            },
            onNewListViewClick(){
                this.onListViewClick();
            },
        },
        computed:{
            gridWrapClass(){
                return this.staticClass + ' productGrid column-' + this.layout
            },
            listWrapClass(){
                return this.staticClass + ' productList'
            }
        }
    }
    usf.register(NewSearchResults, null, "usf-new-sr");


    /**
   * custom filter
   * */
     var NewFilter = {
        mixins: [usf.components.Filters],
        template: usf.templates.filters,
        mounted() {
            this.$nextTick(function() {
                if (!usf.settings.filters.horz && !usf.isMobile && window._usf_sidebar_type != 'horizontal') {
                    this.moveFilter();
                    usf.event.add('mobile_changed', this.moveFilter);
    
                }
            })
        },
        methods: {
            moveFilter() {
                var el = this.$el;
                var drawerZone = document.getElementById('main-collection-filters')
                if (drawerZone) {
                    drawerZone.innerHTML = '';
                    drawerZone.appendChild(el);
                    document.body.classList.add('usf-has-filter-drawer');
                }
            }
        }
    }
    usf.register(NewFilter, null, 'new-filters');
    
/**
     * usf-express-order-griditem
     * for settings.category_layout == "express_order"
     * */
    var ExpressOrderGridItem = {
        mixins: [usf.components.SearchResultsGridItem],
        template: usf.templates.expressOrderGridViewItem,
        props:{
            pIndex: Number
        }
    }
    usf.register(ExpressOrderGridItem, null, "usf-express-order-griditem");

        //usf-ella-griditem
        var EllaGridItem = {
            mixins: [usf.components.SearchResultsGridItem],
            template: usf.templates.searchResultsGridViewItem,
            props: {
                pIndex: Number
            },
            data() {
                var sizeOption;
                var sizeIndex;
                var colorOption;
                var colorIndex;
                var short_description = usf.utils.getMetafield(this.product,'c_f','short_description');
                if(short_description != ''){
                    short_description = _usfTruncateWords(short_description,100000)
                }else{
                    short_description = _usfTruncateWords(this.product.description,44)
                }
                for(let i = 0; i < this.product.options.length;i++){
                    var option = this.product.options[i];
                    var downcased_option = option.name.toLowerCase();
                    if(downcased_option == 'size'){
                        sizeOption = option;
                        sizeIndex = i;
                    }
                    if (_usf_product_swatch_option.includes(option.name.toLowerCase())) {
                        colorOption = option;
                        colorIndex = i;
                        break;
                    }
                }
                return {
                    sizeOption: sizeOption,
                    sizeIndex: sizeIndex,
                    colorOption: colorOption,
                    colorIndex: colorIndex,
                    gridAddToCartForm: '',
                    listAddToCartForm: '',
                    shortDescription: short_description,
                    dataJson : {}
                }
            },
            created() {
                var t = this;
                fetch(`/products/` + t.product.urlName + '?view=usf-data-json', {
                    credentials: 'same-origin',
                    method: 'GET'
                }).then(function (response) {
                    return response.text()  
                }).then(rs => { 
                    t.dataJson = rs;
                    
                });  

                if(_usfGlobalSettings.show_action){
                    fetch(`/products/` + t.product.urlName + '?view=usf-grid-form', {
                        credentials: 'same-origin',
                        method: 'GET'
                    }).then(function (response) {
                        return response.text() 
                    }).then(rs => { 
                        t.gridAddToCartForm = rs;
                    }); 

                    fetch(`/products/` + t.product.urlName + '?view=usf-list-form', {
                        credentials: 'same-origin',
                        method: 'GET'
                    }).then(function (response) {
                        return response.text() 
                    }).then(rs => { 
                        t.listAddToCartForm = rs;
                    }); 
                }
                
                
            },
            computed:{
                cardMediaStyle(){
                    if(!this.product.images.length)
                        return '';
                    return 'padding-bottom:' + (_usf_media_size == 'adapt' ? 100/_usfGetImageRatio(this.selectedImage) : _usfGlobalSettings.portrait_height ) + '%'
                }
            }
        }
        usf.components.EllaGridItem = usf.register(EllaGridItem, null, "usf-ella-griditem");

          /**
    * item size component
    * */
   var UsfItemSize = {
        props: {
            product: Object,
            option: Object,
            optionIndex: Number,
            productUrl: String,
        },
        data() {
            var optionRendereds = {};
            var optionWithValues = [];
            this.option.values.filter(o => {
                for (let x = 0; x < this.product.variants.length; x++) {
                    var v = this.product.variants[x];
                    if (v.options[this.optionIndex] != undefined) {
                        var vrOpt = this.option.values[v.options[this.optionIndex]];
                        if (o === vrOpt && !optionRendereds[o] && !usf.utils.isVariantSoldOut(v)) {
                            optionRendereds[o] = 1;
                            optionWithValues.push({
                                value: o,
                                image: this.product.images[v.imageIndex],
                                variant: v
                            })
                        }
                    }
                }
            })
            return {
                optionWithValues: optionWithValues
            }
        },
        methods: {
            _variantUrl(v) {
                return _usfAddQuery(this.productUrl, `variant=${v.id}`)
            }
        },
        render(h) {
            if (this.optionWithValues.length) return h('div', { class: 'wrapper-item-size card-product__group text-' + _usfGlobalSettings.product_content_text_align}, [
                h('ul',{class: 'sizes-list'},[
                    this.optionWithValues.map((o, index) => {
                        if(index <= 3) return h('li',{class:'size-item'},[
                            h('a',{
                                attrs:{
                                    href: this._variantUrl(o.variant),
                                    title: o.value
                                }
                            },[o.value])
                        ])
                    }),
                    this.optionWithValues.length > 4 ? h('li',{
                        class: 'item-size-more hide-count-5'
                    },[
                        h('a',{
                            attrs:{
                                href: this.productUrl,
                                title: 'More Size'
                            }
                        },[this.optionWithValues.length - 4])
                    ]) : null,
                    this.optionWithValues.length == 4 ? h('li',{
                        class: 'item-size-more show-count-5',
                        style: 'display: none;',
                    },[
                        h('a',{
                            attrs:{
                                href: this.productUrl,
                                title: 'More Size'
                            }
                        },[this.optionWithValues.length - 3])
                    ]) : null,
                ]),
            ])

        }
    }
    usf.register(UsfItemSize, null, 'usf-item-size');


        //product badge
        var UsfBadges = {
            template: usf.templates.gridItemBadges,
            props: {
                badgeClass: String,
                sale: Boolean,
                soldOut: Boolean,
                product: Object,
                badgeDetail: Boolean,
                salePercent: Number,
                loc: Object,
                pIndex: Number
            },
            data() {
                var showSoldOut = usf.settings.search.showSoldOut && _usfGlobalSettings.show_sold_out_badge && this.soldOut;
                var showSale = usf.settings.search.showSale && _usfGlobalSettings.show_sale_badge && this.sale;
                var hasCustomTag = false;
                var hasNewTag = false;
                if(_usfGlobalSettings.show_custom_badge || (_usfGlobalSettings.show_new_badge && _usfGlobalSettings.new_badge_type != 'auto')){
                    for(let i = 0; i < this.product.tags.length;i++){
                        var tag = this.product.tags[i];
                        var tagHandled = _usfHandlezie(tag);
                        if(tagHandled == 'label'){
                            hasCustomTag = true;
                            hasNewTag = true;
                        }
                    }
                }
                var custom_badge = _usfGlobalSettings.show_custom_badge && hasCustomTag;
                

                var show_bundle_badge = false;
                if(_usfGlobalSettings.show_bundle_badge){
                    var bundleMeta = usf.utils.getMetafield(this.product,'c_f','grouped_sub_product');
                    if(bundleMeta != '' && bundleMeta){
                        showBundleBadge = true;
                    }
                }
                
                var show_new_badge = false;
                if(_usfGlobalSettings.show_new_badge){
                    if(_usfGlobalSettings.new_badge_type == 'auto' && usfNewLabel(this.product.date) && this.pIndex <= _usfGlobalSettings.new_badge_limit){
                        show_new_badge = true;
                    }else{
                        show_new_badge = hasNewTag;
                    }
                }
                
                // Get custom metafield badge
                var customMetafieldBadgeValue = usf.utils.getMetafield(this.product, 'custom', 'custom_badge') || usf.utils.getMetafield(this.product, 'custom', 'badge') || '';
                
                return {
                    showSoldOut: showSoldOut,
                    showSale: showSale,
                    showCustomBadge: custom_badge,
                    showBundleBadge: show_bundle_badge,
                    showNewBadge: show_new_badge,
                    customMetafieldBadge: customMetafieldBadgeValue
                }
            },
        }
        usf.register(UsfBadges, null, "usf-badges");

        //product banner
        var UsfBanner = {
            template: usf.templates.ellaBanner,
            props: {
                order: Number,
            },
            data() {
                var position = _usfSectionSettings['banner_position_' + this.order];
                position = parseInt(position) + 2;
                var imgUrl = _usfSectionSettings['img_banner' + this.order];
                var link = _usfSectionSettings['link_banner_' + this.order];
                var imgAttrs = {
                    src: imgUrl
                };
                if(_usfGlobalSettings.enable_lazyload){
                    imgAttrs['data-srcset'] = `${imgUrl} 1x, ${imgUrl} 2x`;
                }else{
                    imgAttrs['srcset'] = `${imgUrl} 1x, ${imgUrl} 2x`;
                }
                return {
                    imgUrl: imgUrl,
                    imgAttrs: imgAttrs,
                    link: link,
                    position: position
                }
            },
        }
        usf.register(UsfBanner, null, "usf-banner");

         //product compare
         var UsfCompare = {
            template: usf.templates.compareBtn,
            props: {
                compareClass: String,
                product: Object,
                check: {
                    type: Boolean,
                    default: false
                }
            },
            data() {
                var cpId = cpId = 'compare-' + this.product.id;
                if(window._usfSectionId){
                    cpId = cpId + '-' + _usfSectionId;
                    
                }
                if(this.check){
                    cpId += '-list';
                }
                return {
                    compareId: cpId
                }
            },
        }
        usf.register(UsfCompare, null, "usf-compare-btn");
    
    /**
     * item size component
     * */
    var UsfProductSwatch = {
        props: {
            product: Object,
            option: Object,
            optionIndex: Number,
        },
        data() {
            var optionRendereds = {};
            var optionWithValues = [];
            var optionShow = [];
            var optionHide = [];
            this.option.values.filter(o => {
                for (let x = 0; x < this.product.variants.length; x++) {
                    var v = this.product.variants[x];
                    if (v.options[this.optionIndex] != undefined) {
                        var vrOpt = this.option.values[v.options[this.optionIndex]];
                        if (o === vrOpt && !optionRendereds[o]) {
                            optionRendereds[o] = 1;
                            optionWithValues.push({
                                value: o,
                                image: this.product.images[v.imageIndex],
                                variant: v
                            })
                        }
                    }
                }
            });
            if (optionWithValues.length <= 4) {
                optionShow = optionWithValues;
            } else {
                optionShow = optionWithValues.slice(0, 4);
                optionHide = optionWithValues.slice(4, optionWithValues.length)
            }
            return {
                optionWithValues: optionWithValues,
                optionShow: optionShow,
                optionHide: optionHide
            }
        },
        methods: {
            renderSwatch(o, h) {
                var text = _usfHandlezie(o.value);
                var labelAttrs = {
                    'data-value': text,
                    'data-variant-id': o.variant.id,
                    title: o.value
                };
                if (this.option.values.length == 1) {
                    labelAttrs['data-with-one-option'] = this.$parent.selectedVariantForPrice.id;
                    labelAttrs['data-quantity'] = this.$parent.isSoldOut ? '0' : '1';
                }
                if (o.image) {
                    labelAttrs['data-variant-img'] = _usfGetOriginImgWithSize(o.image.url, usf.settings.search.imageSize + 'x')
                }
                var temp = o.value.split(' ').pop();
                var opt_handle_last = _usfHandlezie(temp);

                var spanStyle = 'background-color:' + opt_handle_last;
                if (_usfGlobalSettings.swatch_type == 'variant_image' && o.image) {
                    spanStyle += ';background-image: url(' + _usfGetOriginImgWithSize(o.image.url, '40x') + ');';
                } else {
                    spanStyle += ';background-image: url(' + _usfFilesUrl + text + '.png);';
                }
                return h('li', {
                    class: 'item'
                }, [
                    h('div', {
                        class: 'item-wrapper clearfix'
                    }, [
                        h('label', {
                            attrs: labelAttrs,
                            staticClass: 'swatch-label',
                            class: {
                                'is-active': _usfGlobalSettings.quick_shop_type != '2' && o.variant.id == this.$parent.selectedVariantForPrice.id,
                                'is-soldout': this.option.values.length == 1 && this.$parent.isSoldOut
                            }
                        }, [
                            h('span', {
                                class: 'pattern',
                                style: spanStyle
                            }),
                            text
                        ]),
                        h('span', {
                            class: 'tooltip'
                        }, [o.value])
                    ])
                ])
            }
        },
        render(h) {
            if (this.optionWithValues.length) return h('div', {
                class: 'card-swatch clearfix text-' + _usfGlobalSettings.product_content_text_align + (_usfGlobalSettings.quick_shop_type == '2' ? ' quick_shop_type_2' : ''),
                attrs: {
                    id: 'product-swatch-' + this.product.id
                }
            }, [
                h('ul', {
                    class: 'swatch list-unstyled'
                }, [
                    this.optionShow.map((o, index) => {
                        return h('li', {
                            class: 'item'
                        }, [this.renderSwatch(o, h)])
                    }),
                    this.optionHide.length > 4 ? h('li', {
                        class: 'group-swatch',
                        style: "display: none"
                    }, [
                        this.optionHide.map((o, index) => {
                            return this.renderSwatch(o, h)
                        }),
                    ]) : null,
                    this.optionWithValues.length > 4 ? h('li', {
                        class: 'item-swatch-more item',
                    }, [
                        h('a', {
                            attrs: {
                                href: 'javascript:void(0)',
                                title: 'More Color',
                                class: 'number-showmore'
                            }
                        }, [
                            h('span', ['+']),
                            h('span', {
                                class: 'text-number'
                            }, [this.optionWithValues.length - 4])
                        ])
                    ]) : null,
                ]),
            ])

        }
    }
    usf.register(UsfProductSwatch, null, 'usf-product-swatch');

    usf.event.add(['sr_updated', 'sr_viewChanged', 'rerender'], function () {
        setTimeout(function () {
            if(window._usfHalo){
                _usfHalo.initCompareProduct();
                _usfHalo.initWishlist();
                // if(_usfGlobalSettings.show_swatch)
                //     _usfHalo.initProductCardSwatchSilderForGrid();

            }
            if( _usf_collection_layout == 'masonry' && window.resizeAllGridItems && usf.platform.collection){
                window.resizeAllGridItems();
            }
        }, 300);
    });

});
function _usfShowBanner(index,order){
    var position = _usfSectionSettings['banner_position_' + order];
    var show = false;
    if( _usf_collection_layout == 'banner_adv' && position && _usfSectionSettings.show_banner && _usfSectionSettings['show_banner_' + order] && usf.queryRewriter.page == 1){
        position = parseInt(position);
        var forloopIndex = index + 1;
        if(position == forloopIndex)
            show = true;
    }
    return show
}
var usfNewLabel = function (day) {
    var dayNow = new Date(Date.now());
    var productDate = new Date(day);
    var distance = dayNow - productDate;
    var diffDays = Math.floor(distance / (1000 * 60 * 60 * 24));

    return diffDays < _usfGlobalSettings.new_badge_time
}

/**
 * 
 * @param {object} img 
 */
function _usfGetImgAttrs(img, imgUrl, scaledImageUrl){
    var imgData = '';
    var obj = {};
    if(img.width >= 165)
    imgData = _usfGetLazyImageUrls(scaledImageUrl,img)
    else
    imgData = img.url;
    
    if(!_usfGlobalSettings.enable_lazyload)
        obj['data-srcset'] = imgData;
    else{
        //obj['srcset'] = imgData;
        obj.src = imgUrl;
    }
        
    obj.sizes = `(min-width: 1100px) ${img.width}px, (min-width: 750px) calc((100vw - 130px) / 2), calc((100vw - 50px) / 2)`;
    obj.alt = img.alt;
    obj.size = img.width;
    obj.loading = 'lazy';
    obj.class = 'motion-reduce ' + (_usfGlobalSettings.enable_lazyload ? 'lazyload' : '');

    return obj
}
function _usfGetLazyImageUrls(imageUrl,img) { 
    if (_usfIsDynamicImage)
        // in dynamic image size mode, {size} represents the image size
		return _usfImageWidths.map(w => {
            if(img.width >= w){
                return imageUrl.replace('{size}', w) + ' ' + w + 'w'
            }
        }).join(', ')
	
	return imageUrl + ' ' + usf.settings.search.imageSize + 'w'
}


function getVariantTitle(options, p) {
    if (!p.options.length)
        return 'Default title'
    var arrs = [];
    for (let i = 0; i < options.length; i++) {
        var o = options[i];
        arrs.push(p.options[i].values[o])
    }
    return arrs.join(' / ');
}
function _usfSetDefaultThemeSettings(){

    var nodes = document.head.children;
    for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n.href && n.href.indexOf('base.css') !== -1) {
            _usfAssetUrl = n.href.split('base.css')[0];
            _usfFilesUrl = n.href;
            var m = _usfFilesUrl.indexOf('/assets/');
            while (_usfFilesUrl[--m] !== '/');
            while (_usfFilesUrl[--m] !== '/');
            _usfFilesUrl = _usfFilesUrl.substring(0, m) + "/files/";
            break;
        }
    }

    window._usfLayout = window._usfLayout || "4";
    window._usf_wrap_class = window._usf_wrap_class || "productListing productGrid column-4 list-4 list-unstyled";
    window._usfGlobalSettings = window._usfGlobalSettings || {
        enable_background_button_card: false,
        show_badge: true,
        show_sold_out_badge: true,
        badge_postion: "right",
        show_sale_badge: true,
        sale_badge_type: "text",
        show_custom_badge: true,
        show_bundle_badge: true,
        show_new_badge: true,
        new_badge_time: 30,
        new_badge_limit: 30,
        new_badge_type: "auto",
        show_image_swap: true,
        image_swap: null,
        show_compare: true,
        product_compare_type: "default",
        portrait_height: "100",
        enable_lazyload: true,
        show_image_loading: true,
        image_loading_text: "PSU",
        show_quick_view: true,
        product_quick_view_type: "default",
        show_wishlist_card: true,
        show_wishlist: true,
        show_compare: true,
        product_compare_type: "default",
        product_card_layout: "01",
        product_content_text_align: "left",
        display_item_size: true,
        show_action: true,
        show_vendor: true,
        product_title_line_text: "1",
        quick_shop_type: "1",
        style_text_color_varriant: "01",
        show_swatch: true,
        swatch_type: "color",
        display_text_size: true,
        disable_product_card_border: false,
        enable_custom_layout_card: false,
        group_quickview_wishlist: "left",
        show_notify_form: true,
        show_review: true,
    };
    window._usf_product_swatch_option = window._usf_product_swatch_option || "color";
    window._usfSectionId = window._usfSectionId ||'usf-template';
    window._usf_compare_class = window._usf_compare_class || "compare-button";
    window._usf_show_compare = window._usf_show_compare || false,
    window._usf_show_wishlist = window._usf_show_wishlist || true;
    window._usf_show_quick_view = window._usf_show_quick_view || false;
    window._usfNoImageSvg = window._usfNoImageSvg || '<svg class="placeholder-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525.5 525.5"><path d="M375.5 345.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0-1.1-2.9-2.3-5.5-3.4-7.8-1.4-4.7-2.4-13.8-.5-19.8 3.4-10.6 3.6-40.6 1.2-54.5-2.3-14-12.3-29.8-18.5-36.9-5.3-6.2-12.8-14.9-15.4-17.9 8.6-5.6 13.3-13.3 14-23 0-.3 0-.6.1-.8.4-4.1-.6-9.9-3.9-13.5-2.1-2.3-4.8-3.5-8-3.5h-54.9c-.8-7.1-3-13-5.2-17.5-6.8-13.9-12.5-16.5-21.2-16.5h-.7c-8.7 0-14.4 2.5-21.2 16.5-2.2 4.5-4.4 10.4-5.2 17.5h-48.5c-3.2 0-5.9 1.2-8 3.5-3.2 3.6-4.3 9.3-3.9 13.5 0 .2 0 .5.1.8.7 9.8 5.4 17.4 14 23-2.6 3.1-10.1 11.7-15.4 17.9-6.1 7.2-16.1 22.9-18.5 36.9-2.2 13.3-1.2 47.4 1 54.9 1.1 3.8 1.4 14.5-.2 19.4-1.2 2.4-2.3 5-3.4 7.9-4.4 11.6-6.2 26.3-5 32.6 1.8 9.9 16.5 14.4 29.4 14.4h176.8c12.9 0 27.6-4.5 29.4-14.4 1.2-6.5-.5-21.1-5-32.7zm-97.7-178c.3-3.2.8-10.6-.2-18 2.4 4.3 5 10.5 5.9 18h-5.7zm-36.3-17.9c-1 7.4-.5 14.8-.2 18h-5.7c.9-7.5 3.5-13.7 5.9-18zm4.5-6.9c0-.1.1-.2.1-.4 4.4-5.3 8.4-5.8 13.1-5.8h.7c4.7 0 8.7.6 13.1 5.8 0 .1 0 .2.1.4 3.2 8.9 2.2 21.2 1.8 25h-30.7c-.4-3.8-1.3-16.1 1.8-25zm-70.7 42.5c0-.3 0-.6-.1-.9-.3-3.4.5-8.4 3.1-11.3 1-1.1 2.1-1.7 3.4-2.1l-.6.6c-2.8 3.1-3.7 8.1-3.3 11.6 0 .2 0 .5.1.8.3 3.5.9 11.7 10.6 18.8.3.2.8.2 1-.2.2-.3.2-.8-.2-1-9.2-6.7-9.8-14.4-10-17.7 0-.3 0-.6-.1-.8-.3-3.2.5-7.7 3-10.5.8-.8 1.7-1.5 2.6-1.9h155.7c1 .4 1.9 1.1 2.6 1.9 2.5 2.8 3.3 7.3 3 10.5 0 .2 0 .5-.1.8-.3 3.6-1 13.1-13.8 20.1-.3.2-.5.6-.3 1 .1.2.4.4.6.4.1 0 .2 0 .3-.1 13.5-7.5 14.3-17.5 14.6-21.3 0-.3 0-.5.1-.8.4-3.5-.5-8.5-3.3-11.6l-.6-.6c1.3.4 2.5 1.1 3.4 2.1 2.6 2.9 3.5 7.9 3.1 11.3 0 .3 0 .6-.1.9-1.5 20.9-23.6 31.4-65.5 31.4h-43.8c-41.8 0-63.9-10.5-65.4-31.4zm91 89.1h-7c0-1.5 0-3-.1-4.2-.2-12.5-2.2-31.1-2.7-35.1h3.6c.8 0 1.4-.6 1.4-1.4v-14.1h2.4v14.1c0 .8.6 1.4 1.4 1.4h3.7c-.4 3.9-2.4 22.6-2.7 35.1v4.2zm65.3 11.9h-16.8c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h16.8v2.8h-62.2c0-.9-.1-1.9-.1-2.8h33.9c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-33.9c-.1-3.2-.1-6.3-.1-9h62.5v9zm-12.5 24.4h-6.3l.2-1.6h5.9l.2 1.6zm-5.8-4.5l1.6-12.3h2l1.6 12.3h-5.2zm-57-19.9h-62.4v-9h62.5c0 2.7 0 5.8-.1 9zm-62.4 1.4h62.4c0 .9-.1 1.8-.1 2.8H194v-2.8zm65.2 0h7.3c0 .9.1 1.8.1 2.8H259c.1-.9.1-1.8.1-2.8zm7.2-1.4h-7.2c.1-3.2.1-6.3.1-9h7c0 2.7 0 5.8.1 9zm-7.7-66.7v6.8h-9v-6.8h9zm-8.9 8.3h9v.7h-9v-.7zm0 2.1h9v2.3h-9v-2.3zm26-1.4h-9v-.7h9v.7zm-9 3.7v-2.3h9v2.3h-9zm9-5.9h-9v-6.8h9v6.8zm-119.3 91.1c-2.1-7.1-3-40.9-.9-53.6 2.2-13.5 11.9-28.6 17.8-35.6 5.6-6.5 13.5-15.7 15.7-18.3 11.4 6.4 28.7 9.6 51.8 9.6h6v14.1c0 .8.6 1.4 1.4 1.4h5.4c.3 3.1 2.4 22.4 2.7 35.1 0 1.2.1 2.6.1 4.2h-63.9c-.8 0-1.4.6-1.4 1.4v16.1c0 .8.6 1.4 1.4 1.4H256c-.8 11.8-2.8 24.7-8 33.3-2.6 4.4-4.9 8.5-6.9 12.2-.4.7-.1 1.6.6 1.9.2.1.4.2.6.2.5 0 1-.3 1.3-.8 1.9-3.7 4.2-7.7 6.8-12.1 5.4-9.1 7.6-22.5 8.4-34.7h7.8c.7 11.2 2.6 23.5 7.1 32.4.2.5.8.8 1.3.8.2 0 .4 0 .6-.2.7-.4 1-1.2.6-1.9-4.3-8.5-6.1-20.3-6.8-31.1H312l-2.4 18.6c-.1.4.1.8.3 1.1.3.3.7.5 1.1.5h9.6c.4 0 .8-.2 1.1-.5.3-.3.4-.7.3-1.1l-2.4-18.6H333c.8 0 1.4-.6 1.4-1.4v-16.1c0-.8-.6-1.4-1.4-1.4h-63.9c0-1.5 0-2.9.1-4.2.2-12.7 2.3-32 2.7-35.1h5.2c.8 0 1.4-.6 1.4-1.4v-14.1h6.2c23.1 0 40.4-3.2 51.8-9.6 2.3 2.6 10.1 11.8 15.7 18.3 5.9 6.9 15.6 22.1 17.8 35.6 2.2 13.4 2 43.2-1.1 53.1-1.2 3.9-1.4 8.7-1 13-1.7-2.8-2.9-4.4-3-4.6-.2-.3-.6-.5-.9-.6h-.5c-.2 0-.4.1-.5.2-.6.5-.8 1.4-.3 2 0 0 .2.3.5.8 1.4 2.1 5.6 8.4 8.9 16.7h-42.9v-43.8c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v44.9c0 .1-.1.2-.1.3 0 .1 0 .2.1.3v9c-1.1 2-3.9 3.7-10.5 3.7h-7.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h7.5c5 0 8.5-.9 10.5-2.8-.1 3.1-1.5 6.5-10.5 6.5H210.4c-9 0-10.5-3.4-10.5-6.5 2 1.9 5.5 2.8 10.5 2.8h67.4c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-67.4c-6.7 0-9.4-1.7-10.5-3.7v-54.5c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v43.8h-43.6c4.2-10.2 9.4-17.4 9.5-17.5.5-.6.3-1.5-.3-2s-1.5-.3-2 .3c-.1.2-1.4 2-3.2 5 .1-4.9-.4-10.2-1.1-12.8zm221.4 60.2c-1.5 8.3-14.9 12-26.6 12H174.4c-11.8 0-25.1-3.8-26.6-12-1-5.7.6-19.3 4.6-30.2H197v9.8c0 6.4 4.5 9.7 13.4 9.7h105.4c8.9 0 13.4-3.3 13.4-9.7v-9.8h44c4 10.9 5.6 24.5 4.6 30.2z"/><path d="M286.1 359.3c0 .4.3.7.7.7h14.7c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-14.7c-.3 0-.7.3-.7.7zm5.3-145.6c13.5-.5 24.7-2.3 33.5-5.3.4-.1.6-.5.4-.9-.1-.4-.5-.6-.9-.4-8.6 3-19.7 4.7-33 5.2-.4 0-.7.3-.7.7 0 .4.3.7.7.7zm-11.3.1c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H242c-19.9 0-35.3-2.5-45.9-7.4-.4-.2-.8 0-.9.3-.2.4 0 .8.3.9 10.8 5 26.4 7.5 46.5 7.5h38.1zm-7.2 116.9c.4.1.9.1 1.4.1 1.7 0 3.4-.7 4.7-1.9 1.4-1.4 1.9-3.2 1.5-5-.2-.8-.9-1.2-1.7-1.1-.8.2-1.2.9-1.1 1.7.3 1.2-.4 2-.7 2.4-.9.9-2.2 1.3-3.4 1-.8-.2-1.5.3-1.7 1.1s.2 1.5 1 1.7z"/><path d="M275.5 331.6c-.8 0-1.4.6-1.5 1.4 0 .8.6 1.4 1.4 1.5h.3c3.6 0 7-2.8 7.7-6.3.2-.8-.4-1.5-1.1-1.7-.8-.2-1.5.4-1.7 1.1-.4 2.3-2.8 4.2-5.1 4zm5.4 1.6c-.6.5-.6 1.4-.1 2 1.1 1.3 2.5 2.2 4.2 2.8.2.1.3.1.5.1.6 0 1.1-.3 1.3-.9.3-.7-.1-1.6-.8-1.8-1.2-.5-2.2-1.2-3-2.1-.6-.6-1.5-.6-2.1-.1zm-38.2 12.7c.5 0 .9 0 1.4-.1.8-.2 1.3-.9 1.1-1.7-.2-.8-.9-1.3-1.7-1.1-1.2.3-2.5-.1-3.4-1-.4-.4-1-1.2-.8-2.4.2-.8-.3-1.5-1.1-1.7-.8-.2-1.5.3-1.7 1.1-.4 1.8.1 3.7 1.5 5 1.2 1.2 2.9 1.9 4.7 1.9z"/><path d="M241.2 349.6h.3c.8 0 1.4-.7 1.4-1.5s-.7-1.4-1.5-1.4c-2.3.1-4.6-1.7-5.1-4-.2-.8-.9-1.3-1.7-1.1-.8.2-1.3.9-1.1 1.7.7 3.5 4.1 6.3 7.7 6.3zm-9.7 3.6c.2 0 .3 0 .5-.1 1.6-.6 3-1.6 4.2-2.8.5-.6.5-1.5-.1-2s-1.5-.5-2 .1c-.8.9-1.8 1.6-3 2.1-.7.3-1.1 1.1-.8 1.8 0 .6.6.9 1.2.9z"/></svg>';
    window._usf_media_size = window._usf_media_size || "adapt";
    window._usfCustomBadgeTxt = window._usfCustomBadgeTxt  || "Custom Label";
    window._usfBundleTxt = window._usfBundleTxt || "Bundle";
    window._usfNewText = window._usfNewText || "New";
    window._usfAddWishlistTxt = window._usfAddWishlistTxt || "Add to wishlist";
    window._usfCompareTitle = window._usfCompareTitle || "Compare";
    window._usfVendorText = window._usfVendorText || "Vendor:";
    window._usfMoreSizeTxt = window._usfMoreSizeTxt || "More sizes available";
    window._usf_collection_layout = window._usf_collection_layout || "default";
    window._usfImageTxt = window._usfImageTxt || "Images";
    window._usfProductTxt = window._usfProductTxt || "Product";
    window._usfPriceTxt = window._usfPriceTxt || "Price";
    window._usfQtyTxt = window._usfQtyTxt || "Qty";
    window._usfOptionsTxt = window._usfOptionsTxt || "Options";
    window._usfShowVariantsTxt = window._usfShowVariantsTxt || "Show Variants";
    window._usfSectionSettings = window._usfSectionSettings || {
        "show_banner": false,
        "show_banner_1": false,
        "banner_position_1": "2",
        "img_banner1": "",
        "link_banner_1": null,
        "show_banner_2": false,
        "banner_position_2": "4",
        "img_banner2": "",
        "link_banner_2": null,
        "show_banner_3": false,
        "banner_position_3": "12",
        "img_banner3": "",
        "link_banner_3": null
    };
}

/* Begin theme ready code */
if (usf.settings.instantSearch.online && usf.isMobile) {
    // click on search icon -> show our instant search
    var searchIcon = document.querySelector('.header-mobile--icon .header__search');
    if (searchIcon)
        searchIcon.addEventListener('click',function(){
            var target  = document.createElement('input');
            usf.utils.loadAndShowInstantSearch(target, true);
        });

    // still register to 'is_show' event to hide the drawer.
    usf.event.add('is_show', function () {
        setTimeout(() => {
            var closeSearch = document.querySelector('.halo-sidebar-close[data-search-close-sidebar]');
            if(closeSearch)
                closeSearch.click();
            // refocus on our input box
            usf.instantSearch.focus();
        }, 300);
    })
}
/* End theme ready code */