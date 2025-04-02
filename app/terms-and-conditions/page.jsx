"use client";
import ScrollToTop from "@/components/ScrollToTop";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function TermsAndConditionsPage() {
  return (
    <div className="font-extralight tracking-tight">
      <ScrollToTop />

      <div className="mx-auto p-4 md:py-28 text-sm lg:text-base max-w-7xl">
        <h2 className="uppercase text-xl font-extralight tracking-tighter text-gray-900 sm:text-xl mt-28 border-black border text-left px-2 bg-white inline-block mb-4">
          Terms & Conditions
        </h2>
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-black text-lg uppercase py-1">
                    Definitions
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-normal md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-2 mt-2">
                    <strong>Additional Agreement:</strong> An agreement under which the consumer receives products related to a distance purchase contract, with these products being supplied by the Company or a third party pursuant to an agreement between the third party and the Company.
                  </p>
                  <p className="text-gray-700 mb-2 mt-2">
                    <strong>Agreement:</strong> The agreement at distance concluded between the Company and the Customer for the purchase of Good(s) via the Webshop. The Agreement shall be governed by these Terms and Conditions B2C.
                  </p>
                  <p className="text-gray-700 mb-2 mt-2">
                    <strong>Business Day:</strong> Every day, except Saturday, Sunday and national holidays in Portugal.
                  </p>
                  <p className="text-gray-700 mb-2 mt-2">
                    <strong>Company:</strong> OGIVA NUTRITIVA - LDA under the commercial name of Frizbee Ceramics.
                  </p>
                  <p className="text-gray-700 mb-2 mt-2">
                    <strong>Completion:</strong> The making available of the agreed Good(s) and/or work, ready for use as agreed.
                  </p>

                  <p className="text-gray-700 mb-2">
                    <strong>Customer:</strong> Every natural person who purchases or will potentially purchase Good(s) via the Webshop.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Customer Details:</strong> Refers to any information related to the entity purchasing Good(s), including but not limited to company name, registration number, VAT number, billing and shipping addresses, contact persons, phone numbers, email address, and any other relevant data necessary for order processing, invoicing, and contractual obligations.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Day:</strong> A calendar day.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Delivery:</strong> Refers to the transfer of Good(s) from the Company to the Customer by the agreed method, time, and location as specified in the contract or order confirmation.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Distance Selling Method:</strong> Refers to the process of selling Good(s) remotely, where the contract is concluded without face-to-face interaction, using online platforms, telephone, email, or other remote communication channels.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Force Majeure:</strong> Includes, but is not limited to natural disasters; governmental actions; supply chain disruptions; strikes; pandemics or any other unforeseen event beyond the Company’s reasonable control that prevents the fulfillment of contractual obligations.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Good(s):</strong> All items available for order or
                    purchase on the Webshop.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Intellectual Property Right(s):</strong> All trademarks, software (source codes), copyright, copyrighted programs, patents and all neighboring and database rights and moral rights, registered designs, registered and unregistered design rights or any rights or property similar to the foregoing in any part of the world whether registered or unregistered together with the right to apply for the registration of such rights in any part of the world and the rights to current applications for registration of any such intellectual property, as well as every trade-secrets, all know-how, manufacturing and production processes and techniques, research and development information, drawings, specifications, plans, proposals, technical data, and plans and copies and tangible embodiments thereof (in whatever form or medium).
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Offer:</strong> A proposal made by the Company to the Customer outlining the terms under which Good(s) may be provided, including price, quantity, and delivery conditions, which becomes binding upon acceptance.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Order:</strong> A formal request made by the Customer to purchase Good(s) from the Company under the agreed terms and conditions.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Packing Costs:</strong> The expenses incurred for packaging materials and labor required to prepare Good(s) for safe transportation and delivery to the Customer.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Parties:</strong> The entities entering into the Agreement, namely the Company and the Customer, collectively referred to as the “Parties” and individually as a Party.
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Personal Data:</strong>Any information relating to an identified or identifiable natural person (&apos;data subject&apos;) which is processed by or on behalf of one the Parties for the execution of this Agreement.
                  </p>
                  {/* <p className="text-gray-700 mb-2">
                    <strong>Seller:</strong> Leek SRL incorporated under the
                    laws of Belgium with registered office at Chaussée de La
                    Hulpe, 207, B-1170 Watermael-Boitsfort and VAT-number
                    BE791.269.184 (commercial name: Frizbee Ceramics).
                  </p> */}

                  <p className="text-gray-700 mb-2">
                    <strong>Webshop:</strong> The webshop on the following website frizbeeceramics.com, or any other platform hosted by the Company.
                  </p>

                  {/* <p className="text-gray-700">
                    <strong>User:</strong> Any visitor of the Webshop.
                  </p> */}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Identity of the Company */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Identity of the Company
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-2">
                    <strong>Name of the company:</strong> OGIVA NUTRITIVA - LDA
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Commercial name:</strong> Frizbee Ceramics
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Registered office address:</strong> Herdade da Barrosinha CASA 3, 7580-514 Alcácer do Sal
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Phone number:</strong> +32484570756
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>E-mail address:</strong> hey@frizbeeceramics.com
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>VAT-number:</strong> PT517890186
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>


        {/* General Provision Section */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    General Provision
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-2 mt-2">
                    These General terms and conditions of sale in the B2C context (“Terms and Conditions B2C”), define the mutual rights and obligations for any order or purchase of Good(s) by a Customer made via:
                  </p>
                  <p className="text-gray-700 mb-2 mt-2">
                    (i) the Webshop;
                  </p>
                  <p className="text-gray-700 mb-2 mt-2">
                    (ii) any other Distance Selling Method, or;
                  </p>
                  <p className="text-gray-700 mb-2 mt-2">
                    (iii) direct sales at events, in its showroom located in Herdade da Barrosinha CASA 3, 7580-514 Alcácer do Sal, Santa Maria do Castelo e Santiago e Santa Susana, or other sales locations.
                  </p>
                  <p className="text-gray-700 mb-2">
                    The purpose of these Terms and Conditions B2C is to regulate the relationship between the Company and the Customer. These Terms and Conditions B2C apply to all orders placed by a Customer on the Webshop. By placing an order via the Webshop or by any other distance communication method, the Customer agrees to these Terms and Conditions B2C. These Terms and Conditions B2C will be made available to the Customer before the conclusion of the Agreement, in a format that will allow the Customer to save the Terms and Conditions B2C on a durable electronic data carrier.
                  </p>
                  <p className="text-gray-700">
                    For any order or purchase of Good(s) by a Customer, please refer to the Terms and Conditions in the B2C context.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Formation and Duration of the Agreement Section */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Formation and Duration of the Agreement
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <ol className="list-decimal pl-5 text-gray-700 mb-4">
                    <li>Good(s) are offered for sale on the Webshop or in the Showroom. </li>
                    <li>The Agreement is concluded as from the moment the Customer has accepted the offer including the Terms and Conditions B2C. </li>
                    <li>
                      The Agreement and the Terms and Conditions B2C will remain in force until all obligations have been executed.
                    </li>
                    <li>
                      Any sale on the Webshop is conditional to the acceptance without reservation of such Terms and Conditions B2C.
                    </li>
                    <li>
                      The Customer must provide complete Customer Details including an email address, billing information and a valid delivery address. Any communication to the Company shall take place through this email address unless provided for otherwise.
                    </li>
                  </ol>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Prices Section */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Pricing
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-2 mt-2">
                    The prices of the Good(s) will be as quoted on the Webshop
                    at the time the Customer submits an order.
                  </p>
                  <p className="text-gray-700 mb-2">
                    All prices listed on the Webshop are expressed in EURO (€) and include VAT as applicable in Portugal.
                  </p>
                  <p className="text-gray-700 mb-2">
                    The prices of the Good(s) are based on the prices of raw materials, labor, commission fees, Good(s) ordered, remunerations or external costs.
                  </p>
                  <p className="text-gray-700 mb-2">
                    The Company makes all reasonable efforts to ensure that all prices shown on the Webshop are correct at the time of publication. However, the Company reserves the right to change prices and to add, alter, or remove special offers at any time as necessary.
                  </p>
                  <p className="text-gray-700 mb-2">
                    Delivery charges are not included in the price of Good(s) displayed on the Webshop and will be presented to the Customer as part of the order process. These are calculated based on volumetric weight and location.
                  </p>
                  <p className="text-gray-700">
                    The Company accepts orders from, and delivers to, Customers outside of the EU; however, the Customer is responsible for any customs duties, importation taxes, or any other fees required by their country.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Goods, Pricing and Availability Section */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Good(s), pricing and availability - Presentation of the Good(s)
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-2">
                    The Company makes all reasonable efforts to ensure that all descriptions and graphical representations of the Good(s) available on the Webshop or in the Showroom and documents correspond to the actual Good(s). Please note, however, the following:
                  </p>

                  <ul className="list-disc pl-5 text-gray-700 mb-2">
                    <li>
                      Images of Good(s) are for illustrative purposes only. There may be slight variations in colour or the pattern between the image of a product and the actual product sold due the handmade nature of the products.
                    </li>
                    <li>
                      Due to the handmade nature of the Good(s), slight variations of up to five percent (5%) in size, weight, and capacity may occur between the illustrative photos and the final delivered product. Additionally, some Good(s) may not be perfectly straight, as clay naturally shifts during the drying and firing process. When ordering a batch, slight differences in the color of the clay and glaze may occur depending on the placement of each piece in the kiln. These variations do not affect the functionality of the Good(s).
                    </li>
                    <li>
                      The Company cannot guarantee stock availability at all times.
                    </li>
                    <li>
                      From time to time, minor adjustments may be made to certain Good(s) between the placement of an Order and its processing and dispatch by the Company. These changes may be necessary to comply with updated laws and regulations or to address technical or security considerations. Such modifications will not alter the fundamental characteristics of the Good(s) or impact their intended use. However, if any change does affect the functionality or usability of the Good(s), the Company will provide appropriate notification.
                    </li>
                    <li>
                      The accompanying photos are for decorative purposes and may include elements that are not part of the listed price. Due to the handmade nature of the design, slight variations in placement may occur, as intentional differences are incorporated to ensure each cup is unique. Unless otherwise agreed, these variations are an inherent part of the design process.
                    </li>
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Online Purchases Section */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Online Purchases
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <h4 className="font-bold text-lg mb-2 mt-2">
                    Order Submitted:
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Upon successful payment, the Customer will receive an order confirmation via email.
                  </p>
                  {/* <p className="text-gray-700 mb-4">
                    During checkout, the Customer reviews the order, agrees to
                    the Terms and Conditions B2C, and clicks the Place Order
                    button. The Customer must pay at the moment of the placement
                    of the order. Customers receive a confirmation of their
                    orders via email.
                  </p> */}

                  {/* <h4 className="font-bold text-lg mb-2">Payment:</h4> */}
                  <p className="text-gray-700 mb-4">
                    The Customer may choose between the following payment
                    methods:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 mb-4">
                    <li>by PayPal</li>
                    <li>by credit card</li>
                    <li>through bank transfer</li>
                    <li>via Bancontact</li>
                    <li>through Stripe or any alternative payment method proposed on the Webstore.
                    </li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    If the Customer selects bank transfer, the Company will begin processing the order only after full payment has been received.
                  </p>
                  <p className="text-gray-700 mb-4">
                    If full payment is not received within five (5) Business Days from the order date, the Company reserves the right to cancel the order automatically.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The Company is entitled to refuse an order pursuant to a breach on the part of the Customer with respect to their orders or in case of suspicion of fraud or for any other valid reason deemed necessary by the company.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Once payment is authorized and processed, the invoice status will be updated to “Paid” and the order will be prepared for shipment.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The Customer may select a preferred delivery method available on the Webshop and the package shall be shipped in accordance with Article 8 - Shipping and Delivery.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The Customer will receive a confirmation with the tracking code via email as soon as the order leaves the premises of the Company.
                  </p>
                  <p className="text-gray-700 mb-4">
                    If the Company is unable to contact the Customer using the customer details provided during the order process, or if no response is received within the timeframe set out above, the Company will treat the order as cancelled and notify the Customer in writing.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Once an order has been placed through Shopify, the billing information cannot be modified.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Shipping and Delivery Section */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Shipping and Delivery
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <h4 className="font-bold text-lg mb-2">
                    Pick-up at the Showroom:
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Unless agreed otherwise, the delivery of the Good(s) occurs at the Showroom of the Company located at Herdade da Barrosinha CASA 3, 7580-514 Alcácer do Sal, after notification from the Company that the Good(s) are ready for pickup.
                  </p>

                  <h4 className="font-bold text-lg mb-2">Delivery:</h4>
                  <p className="text-gray-700 mb-4">
                    The Company aims to deliver the Good(s) within a non-binding period of thirty (30) Days after receipt of the payment in full, unless another delivery date is concluded between the Company and the Customer at the moment of formation of the Agreement. Shipments outside of the EU can take a non-binding period of forty-five (45) Calendar Days as services can vary depending on the location of the Customer.
                  </p>

                  <p className="text-gray-700 mb-4">
                    During peak periods, such as Christmas and holidays, delivery times may be extended up to twice the standard timeframe. The Company cannot be held responsible for these delays. All items are shipped with a tracking service.
                  </p>

                  <p className="text-gray-700 mb-4">
                    In case the Company is not able to deliver the Good(s) within the period set out above, the Company undertakes to inform the Customer thereof in writing.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The Customer has the right to cancel the order if shipping has not occurred within ninety (90) Business Days.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The Company shall deliver the order to the address provided by the Customer to the Company during the purchase process.
                  </p>
                  <p className="text-gray-700 mb-4">
                    In case there is no one available at the address of the Customer at the moment of delivery, the Customer must follow the instructions of the delivery service in charge of the delivery of the order. The Company reserves the right to make partial deliveries of the ordered Good(s), for example in case part of the order is delayed or unavailable.
                  </p>
                  <p className="text-gray-700 mb-4">
                    In case of partial delivery, the Company will notify the Customer via email.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The Customer must check the packaging upon delivery/collection for possible damages. In case the Good(s) are damaged, the Customer must not accept the delivery and must notify the Company immediately and maximum within forty-eight (48) hours. After notification, the Company will provide the Customer with the necessary instructions regarding the damaged Good(s).
                  </p>
                  <h4 className="font-bold text-lg mb-2">Pick-up:</h4>
                  <p className="text-gray-700 mb-4">
                    The Customer has the possibility during the ordering process to choose for the pick up at the studio if possible. The Customer can choose this option in the shipping options during checkout. The Customer will need to send an email to the Company so the Parties can set a date & hour for pickup.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The Customer can send this email to hey@frizbeeceramics.com .
                  </p>
                  <p className="text-gray-700">
                    The Customer must report any visible damage, quality defects, or other issues with the delivered item to the Company within forty-eight (48) hours of arrival.
                  </p>
                  <p className="text-gray-700">
                    The risk due to loss or damage is transferred to the Customer at the time the Good(s) have been physically received by the Customer (or a third party indicated by the Customer that is not the carrier). However, the risk transfers to the Customer upon delivery to the carrier when the carrier receives the commission to transport the Good(s) and this option was not offered by the Company.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Right of Withdrawal of a Consumer Section */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Right of withdrawal of a Consumer
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4">
                    The right of withdrawal does not apply to Good(s) manufactured according to the Customer’s specifications or those clearly intended for a specific individual.
                  </p>

                  <p className="text-gray-700 mb-4">
                    The right of withdrawal does not apply to Good(s) that were on sale or purchased with a discount at the time of purchase;
                  </p>

                  <p className="text-gray-700 mb-4">
                    In accordance with the Portuguese Civil Code, the Customer has the right to withdraw from the Agreement within fourteen (14) calendar days without providing a reason.
                  </p>

                  <p className="text-gray-700 mb-4">
                    The withdrawal period expires fourteen (14) calendar days from the date the Customer or a third party (excluding the carrier) physically receives the Good(s).
                  </p>
                  <p className="text-gray-700 mb-4">
                    To exercise the right of withdrawal, the Customer must notify the Company of their decision by means of a clear statement (e.g., via a registered letter or email).
                  </p>
                  <p className="text-gray-700 mb-4">
                    The Customer may use the sample withdrawal form provided below, but its use is not mandatory.
                  </p>
                  <p className="text-gray-700 italic mb-4">
                    To: [Company&apos;s Contact Details]
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 mb-4 italic">
                    <li>
                      I/we (*) hereby notify you (*) of my/our (*) withdrawal
                      from the contract concluded by me/us (*) for the purchase
                      of the following goods (*)
                    </li>
                    <li>Ordered on (*) / received on (*)</li>
                    <li>Name of the consumer(s): (*)</li>
                    <li>Address of the consumer(s): (*)</li>
                    <li>Order number: (*)</li>
                    <li>
                      Signature of consumer(s): (*)(only if notified on paper)
                    </li>
                    <li>Date: (*)</li>
                    <li>(*) Delete as appropriate.</li>
                  </ul>

                  <h4 className="font-bold text-lg mb-2">
                    Return of Goods
                  </h4>
                  <p className="text-gray-700 mb-4">
                    The Customer must return the Good(s) to the Company at Frizbee Ceramics, Herdade da Barrosinha, 7580-514 Alcácer do Sal, Portugal no later than fourteen (14) calendar days from the date they notified the Company of their withdrawal.
                  </p>

                  <p className="text-gray-700 mb-4">
                    The Customer is deemed to have met this deadline if the Good(s) are sent back before the fourteen (14) calendar days expire.
                  </p>

                  <p className="text-gray-700 mb-4">
                    The direct costs of returning the Good(s) shall be borne by the Customer.
                  </p>

                  <h4 className="font-bold text-lg mb-2">
                    Refund Policy
                  </h4>
                  <p className="text-gray-700 mb-4">
                    Once the returned Good(s) are received, the Company will process a refund for the amounts previously paid for the Good(s) by the Customer. The refund won’t include the transportation costs incurred.
                  </p>

                  <p className="text-gray-700 mb-4">
                    The refund shall be processed within a reasonable time after the Company receives the returned Good(s).
                  </p>
                  <p className="text-gray-700 mb-4">
                    Refunds will be issued to the same credit or debit card used for the original payment.
                  </p>

                  <p className="text-gray-700">
                    No refund will be granted if;
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 mb-4">
                    <li>
                      The legal withdrawal period has expired;
                    </li>
                    <li>The Good(s) are not returned in their entirety, in their original condition, and in the original packaging.</li>
                    <li>
                      The Good(s) were purchased with a discount or promotional offer.
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    The Customer may not exercise the right of withdrawal for:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 mb-4">
                    <li>
                      The delivery of Good(s) manufactured to the Customer’s specifications or clearly intended for a specific individual;
                    </li>
                    <li>  Items that were on sale at the time of purchase;</li>
                    <li>
                      Any other exceptions provided under the Portuguese Civil Code and applicable consumer protection laws.
                    </li>
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Warranty Section */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Warranty
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4 mt-2">
                    The Customer as consumer has the right to a legal warranty
                    of 2 years. The legal warranty covers hidden defects or lack
                    of conformity of the Goods that manifests itself within the
                    period of 2 years from the date of delivery of the Goods.
                  </p>

                  <p className="text-gray-700 mb-4">
                    The Customer must inform the Company at{" "}
                    <a
                      href="mailto:hey@frizbeeceramics.com"
                      className="text-blue-600 underline"
                    >
                      hey@frizbeeceramics.com
                    </a>{" "}
                    of the defective Goods within a maximum period of one month
                    after the hidden defect becomes known or could have
                    reasonably become known to the Customer.
                  </p>

                  <p className="text-gray-700 mb-4">
                    In case a defect occurs within the legal warranty period of 2 years, the Customer must follow the procedure as set out in Article 9.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Upon receiving the returned defective Good(s) and confirming the defect, the Company will either replace or repair the Good(s) at no cost to the Customer, covering all expenses related to the exchange or repair.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The Good(s) can only be replaced and delivered if they are still available or in stock. If repair or replacement is not possible or cannot be completed within a reasonable timeframe, the Customer has the right to terminate the Agreement, and the Company will issue a refund in accordance with Article 9.
                  </p>

                  <h4 className="font-bold text-lg mb-2">The Company’s legal warranty does not apply in the following cases:</h4>
                  <ul className="list-disc pl-5 text-gray-700 mb-4">
                    <li>Normal wear and tear of the Good(s);</li>
                    <li>Accidents, disasters, or force majeure events;
                    </li>
                    <li>
                      Misuse, negligence, or failure to follow usage instructions, including improper use of the Good(s);
                    </li>
                    <li>
                      Improper storage or handling of the Good(s);
                    </li>
                    <li>
                      Any other legally valid exclusion.
                    </li>
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Termination of the Agreement Section */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Termination of the Agreement
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4 mt-2">
                    Either Party may terminate the Agreement or suspend its obligations at any time with prior notice if the other Party fails to fulfill an essential contractual obligation, or if there is a justifiable concern for the occurrence of it.
                  </p>
                  <p className="text-gray-700">Termination or suspension may also occur if it becomes evident that the other Party will fail to meet its obligations, or if there is a risk of non-fulfillment, even before the obligation is due.
                  </p>
                  <p className="text-gray-700">
                    If termination is due to the Customer’s actions or breach, the Company is automatically entitled to a lump-sum compensation of thirty percent (30%) of the cost of the remaining work.
                  </p>
                  <p className="text-gray-700">
                    This compensation is without prejudice to any additional damages or interest if the actual loss suffered by the Company exceeds this amount.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Force Majeure Section */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Force Majeure
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4 mt-2">
                    The Company is not liable or responsible for any failure to perform, or delay in performance of, any of its obligations under the Agreement that is due to a situation of Force Majeure. In case of a situation of Force Majeure:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 mb-4">
                    <li>The Company shall inform the Customer thereof, and;</li>
                    <li>
                      The Company’s obligations under the Agreement will be suspended and the time for the performance of the obligations will be extended for the duration of the situation of Force Majeure. Where the situation of Force Majeure affects the delivery of the Good(s), the Company will arrange a new delivery date with the Customer after the situation of Force Majeure is over.
                    </li>
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Intellectual Property Section */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Intellectual Property
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4 mt-2">
                    All models, drawings, trademarks, logos, texts, software, scripts, graphics, photos, creations, sounds, music, and any other content available on the Webshop (including graphic illustrations and text) are protected by Intellectual Property Rights, primarily copyright.
                  </p>
                  <p className="text-gray-700 mb-4">
                    The sale or purchase of Good(s) does not transfer any Intellectual Property Rights to the Customer or User.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Reproduction, distribution, copying, or any other use of the Webshop’s content, except for private use by the User, requires prior written authorization from the Company.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Any use for commercial or advertising purposes is strictly prohibited without the Company’s express written consent.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Users are not permitted to systematically extract and/or reuse parts of the Webshop’s content without the express written consent of the Company.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Users may not use data mining tools, robots, or similar data collection or extraction methods to extract and/or reuse substantial parts of the Webshop’s content, including Good(s).
                  </p>
                  <p className="text-gray-700 mb-4">
                    Users are prohibited from creating or publishing databases that contain substantial portions of the Webshop’s content, such as prices or product lists, without the Company’s express written consent.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Entire Agreement */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Entire Agreement
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4 mt-2">
                    These Terms and Conditions B2C constitute the entire
                    agreement and understanding of the parties and supersede any
                    previous agreement between the parties in respect of its
                    subject matter.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Proof */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Proof
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4 mt-2">
                    The Customer acknowledges and agrees that electronic communications, including emails and digital records, as well as backups, may be used as valid evidence in any dispute, transaction, or contractual matter.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Liability */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Liability
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4 mt-2">
                    Without prejudice to any mandatory legal provisions or liability arising from fraud or willful misconduct, the Company’s liability for direct damages shall in all circumstances be limited to the value of the ordered Good(s).
                  </p>
                  <p className="text-gray-700 mb-4 mt-2">
                    Any liability for indirect damages, including but not limited to reputational harm, loss of opportunity, or consequential damages, is expressly excluded.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Invalid Clause */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Invalid Article
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4 mt-2">
                    If any provision of these B2C Terms and Conditions is found to be invalid, unlawful, or unenforceable, in whole or in part, such invalidity shall not affect the validity or enforceability of the remaining provisions.
                  </p>
                  <p className="text-gray-700 mb-4 mt-2">
                    The Parties undertake to replace the invalid or unenforceable provision with a legally valid provision that most closely reflects the original economic intent of the ineffective article.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Retention of Title */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Retention of Title
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4 mt-2">
                    The delivered items remain the exclusive property of the Company until full payment by the Customer. If necessary, the Customer undertakes to inform third parties of the Company&#39;s retention of title, e.g. to anyone who would seize articles that have not yet been paid in full.

                  </p>
                  <p className="text-gray-700 mb-4 mt-2">
                    Until ownership is transferred, the Customer undertakes to preserve the Good(s) in good condition and refrain from selling, pledging, or otherwise encumbering them.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Use of Personal Data */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Use of Personal Data
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4 mt-2">
                    The Company shall process the Customer’s personal data exclusively in accordance with its Privacy Policy, as published on its Webshop. By entering into this Agreement, the Customer acknowledges having read and accepted the Company’s Privacy Policy on the Webshop.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Law and Jurisdiction */}
        <div className="">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Law and Jurisdiction
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4 mt-2">
                    These Terms and Conditions B2C shall be governed by and construed in accordance with the laws of Portugal and EU regulations.
                  </p>
                  <p className="text-gray-700 mb-4 mt-2">
                    Unless a mandatory provision under Portuguese law states otherwise, each party agrees to submit to the exclusive jurisdiction of the courts of Lisbon, Portugal or as per applicable EU dispute resolution mechanisms. For transactions outside the EU, disputes shall be resolved by arbitration under the ICC Rules, with proceedings conducted in Lisbon.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Settlement of disputes */}
        <div className="mb-20">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between items-center text-left text-sm font-normal tracking-tighter text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 border-b-[0.5px] border-[#000]">
                  <h3 className="font-extralight tracking-tighter text-lg py-1 uppercase">
                    Settlement of disputes
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4 mt-2">
                    In the event of any dispute arising from or related to these Terms and Conditions, the Parties shall first attempt to resolve the matter amicably through negotiations. Either Party may request a formal discussion to seek a mutually agreeable solution.

                  </p>
                  <p className="text-gray-700 mb-4 mt-2">
                    If an amicable resolution is not reached within fourteen (14) days, either Party may propose mediation as a means of dispute resolution. Mediation shall take place online or at a location agreed upon by both Parties, and the Parties shall jointly appoint a neutral, accredited mediator. Each Party shall bear its own costs, while the costs of the mediator shall be shared equally.
                  </p>
                  <p className="text-gray-700 mb-4 mt-2">
                    If mediation does not result in a resolution within fourteen (14) days, the dispute shall be settled by the competent courts of Setúbal, Portugal, under Portuguese law.
                  </p>
                  <p className="text-gray-700 mb-4 mt-2">
                    During any dispute resolution process, both parties shall continue to fulfill their contractual obligations to the extent possible, except where performance is directly affected by the dispute.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </div>
  );
}
