import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { useTranslation } from 'react-i18next';

export default function About() {

    let { t } = useTranslation();

    let [lists, setLists] = useState([t("A_World_Of_Choice"), t("Quality_Assurance"), t("Exceptional_Customer_Service"), t("Secure_Shopping"), t("Fast_and_Reliable_Shipping"), t("Hassle-Free_Returns")])

    return (
        <>
            <Nav />
            <div className='about'>
                <div className="about_us">
                    <h1 className='heading'>{t("about_us")}</h1>
                    <p>{t("Welcome_to_Kimit_Store_where_your_online_shopping_journey_begins!")}</p>
                    <p>{t("At_Kimit_Store,_we_believe_that_shopping_should_be_convenient,_enjoyable,_and_tailored_to_your_unique_preferences._Whether_you're_looking_for_the_latest_fashion_trends,_cutting-edge_gadgets,_home_essentials,_or_specialty_gifts,_we've_got_you_covered.")}</p>
                </div>
                <div className="section_one">
                    <h1 className='heading'>{t("Why_Choose_Kimit_Store?")}</h1>
                    <ul>
                        {
                            lists.map((list, index) =>
                                <>
                                    <li key={index}><span className='list_style'>{index + 1}</span>{list}</li>
                                    <p key={index + 1}>{t("Explore_a_vast_selection_of_products_from_leading_brands_and_trusted_sellers,_all_in_one_place._From_fashion-forward_clothing_to_the_latest_tech_gadgets,_we_offer_an_extensive_range_of_items_to_suit_every_taste_and_need.")}</p>
                                </>
                            )
                        }
                    </ul>
                </div>
                <div className="section_two">
                    <h1 className="heading">{t("Shop_With_Confidence")}</h1>
                    <p>{t("At_Kimit_Store,_we_are_passionate_about_providing_an_exceptional_online_shopping_experience._We_are_dedicated_to_helping_you_discover_the_products_you_love_and_simplifying_your_shopping_journey.")}</p>
                    <p>{t("Thank_you_for_choosing_Kimit_Store_as_your_trusted_online_shopping_destination._Start_exploring_our_website_today_and_unlock_a_world_of_possibilities!")}</p>
                    <p>{t("Your_satisfaction_is_our_success,_and_we_look_forward_to_serving_you.")}</p>
                </div>
            </div>
            <Footer />
        </>
    )
}
