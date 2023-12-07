"use client";
import ScrollToTop from "@/components/ScrollToTop";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

export default function TermsAndConditionsPage() {
  return (
    <div className="font-extralight tracking-tight bg-white">
      <ScrollToTop />

      <div className="mx-auto p-4 md:py-28 text-sm lg:text-base max-w-7xl">
        <h2 className="uppercase text-xl font-extralight tracking-tighter text-gray-900 sm:text-4xl mb-1 mt-28 border-black border text-left px-2 bg-white inline-block">
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
                    <strong>Business Day:</strong> Every day, except Saturday,
                    Sunday and national holidays in Belgium.
                  </p>

                  <p className="text-gray-700 mb-2">
                    <strong>Customer:</strong> Every natural person who acts for
                    purposes that fall outside of his commercial, corporate,
                    crafts or professional activities and who purchases or will
                    potentially purchase Good(s) via the Website.
                  </p>

                  <p className="text-gray-700 mb-2">
                    <strong>Good(s):</strong> All items available for order or
                    purchase on the Webshop.
                  </p>

                  <p className="text-gray-700 mb-2">
                    <strong>{`Intellectual Property Right(s):`}</strong>{" "}
                    {`Means all
                    trademarks, software (source codes), copyright, copyrighted
                    programs, patents and all neighbouring and database rights
                    and moral rights, registered designs, registered and
                    registered design rights or any rights or property similar
                    to the foregoing in any part of the world whether registered
                    or unregistered together with the right to apply for the
                    registration of such rights in any part of the world and the
                    rights to current applications for registration of any such
                    intellectual property, as well as every trade-secrets, all
                    know-how, manufacturing and production processes and
                    techniques, research and development information, drawings,
                    specifications, plans, proposals, technical data, and plans
                    and copies and tangible embodiments thereof (in whatever
                    form or medium).`}
                  </p>

                  <p className="text-gray-700 mb-2">
                    <strong>Personal Data:</strong>{" "}
                    {`Means any information
                    relating to an identified or identifiable natural person
                    ('data subject') which is processed by or on behalf of one
                    the Parties for the Agreement.`}
                  </p>

                  <p className="text-gray-700 mb-2">
                    <strong>Seller:</strong>
                    {`Leek SRL incorporated under the
                    laws of Belgium with registered office at Chaussée de La
                    Hulpe, 207, B-1170 Watermael-Boitsfort and VAT-number
                    BE791.269.184 (commercial name: Frizbee Ceramics).`}
                  </p>

                  <p className="text-gray-700 mb-2">
                    <strong>Webshop:</strong> The webshop on the following
                    website https://www.frizbeeceramics.com/ or any other
                    platform hosted by the Seller.
                  </p>

                  <p className="text-gray-700">
                    <strong>User:</strong> Any visitor of the Webshop.
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
                    {`This document sets out the terms and conditions (hereinafter
                    referred to as the “Terms and Conditions B2C”) applicable to
                    the Webshop and to any other distance sale and/or to any
                    other online offers made by the Seller. The purpose of these
                    Terms and Conditions B2C is to regulate the relationship
                    between the Seller and the Customer. These Terms and
                    Conditions B2C are applicable to all orders placed by a
                    Customer on the Webshop. When placing an order via the
                    Webshop or by any other distance communication means,
                    Customer must explicitly accept these Terms and Conditions
                    B2C.`}
                  </p>
                  <p className="text-gray-700 mb-2">
                    These Terms and Conditions B2C will be made available to the
                    Customer, at least before the conclusion of the Agreement,
                    in a manner that will allow the Customer to save the Terms
                    and Conditions B2C on a durable electronic data carrier.
                  </p>
                  <p className="text-gray-700">
                    {`For any order or purchase of Good(s) by a professional
                    customer, please refer to the Terms and Conditions in the
                    B2B context below.`}
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
                    Duration of the Agreement
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-2 mt-2">
                    {`Good(s) are offered for sale or advertised on the Webshop.
                    The Agreement is concluded as from the moment the Customer
                    has accepted the offer and the Terms and Conditions B2C. The
                    Agreement and the Terms and Conditions B2C will remain in
                    force until all obligations have been executed. Any sale on
                    the Webshop is conditional to the acceptance without
                    reservation of such Terms and Conditions B2C.`}
                  </p>
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
                    Prices
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-2 mt-2">
                    {`The prices of the Good(s) will be as quoted on the Webshop
                    at the time the Customer submits an order.`}
                  </p>
                  <p className="text-gray-700 mb-2">
                    All prices listed on the Webshop are expressed in EUR and
                    include VAT as applicable in Belgium.
                  </p>
                  <p className="text-gray-700 mb-2">
                    Delivery charges are not included in the price of Goods
                    displayed on the Webshop. Delivery options and related
                    charges will be presented to the Customer as part of the
                    order process. Please note that the Seller accepts orders
                    from, or delivers to, Customers outside Belgium; however,
                    the Customer will be responsible for any customs duties or
                    any other importation tax. Before they purchase, the
                    Customer must bear in mind that they are responsible for
                    tax, customs duties, and any other fees that might be due in
                    their country. These rates vary from country to country. The
                    Customer will need to find out with their customs how much
                    this would be. All shipping costs are, however, calculated
                    by volumetric weight.
                  </p>
                  <p className="text-gray-700">
                    {`The Seller makes all reasonable efforts to ensure that all
                    prices shown on the Webshop are correct at the time of going
                    online. The Seller reserves the right to change prices and
                    to add, alter, or remove special offers from time to time
                    and as necessary. If a Good is incorrectly priced on the
                    Webstore, the Seller will contact the Customer in writing as
                    soon as the Seller becomes aware of the incorrect price. The
                    Customer has the option to continue to purchase the Good(s)
                    or to cancel the order. The order will not be processed
                    until the Seller has received instructions from the Customer
                    within 15 days from the moment the Seller has notified the
                    Customer. If the Seller is unable to contact the Customer,
                    using the contact details provided by the Customer during
                    the order process, or if the Seller does not receive any
                    response from the Customer within the timeframe set out
                    above, the Seller will treat the order as cancelled and will
                    notify the Customer thereof in writing.`}
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
                    Goods, Pricing & Availability
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-2">
                    The Seller makes all reasonable efforts to ensure that all
                    descriptions and graphical representations of the Goods
                    available on the Webshop correspond to the actual Goods.
                    Please note, however, the following:
                  </p>

                  <ul className="list-disc pl-5 text-gray-700 mb-2">
                    <li>
                      Images of Goods are for illustrative purposes only. There
                      may be slight variations in colour or the pattern between
                      the image of a good and the actual good sold due to
                      differences in computer displays and lighting conditions.
                    </li>
                    <li>
                      Some Goods might not be perfectly straight. Clay/porcelain
                      or any other raw material moves during the drying and
                      firing stage. If you order a batch of pieces the colour of
                      the clay and glaze might be slightly different shades.
                      This is due to where the piece was placed in the kiln.
                      These add character to a handmade Goods and do not have an
                      effect on the function. Everything is handmade so please
                      bear that in mind.
                    </li>
                    <li>
                      Due to the nature of the Goods sold through the Webshop,
                      there may be up to a 5% variance in the size, capacity,
                      dimensions, weight, of those Goods between the actual
                      Goods and the description.
                    </li>
                    <li>
                      The Seller cannot guarantee that Goods will always be
                      available. Stock indications are provided on the Webshop,
                      however, such indications may not be accurate.
                    </li>
                    <li>
                      Minor changes may, from time to time, be made to certain
                      Goods between your Order being placed and the Seller
                      processing that Order and dispatching the Goods, for
                      example, to reflect changes in relevant laws and
                      regulatory requirements, or to address particular
                      technical or security issues. Any such changes will not
                      change any main characteristics of the Goods and will not
                      normally affect your use of those Goods. However, if any
                      change is made that would affect the use of the Goods,
                      suitable information will be provided.
                    </li>
                    <li>
                      The accompanying photos are intended as decorative and may
                      contain elements that are not included in the price.
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
                    During checkout, the Customer reviews the order, agrees to
                    the Terms and Conditions B2C, and clicks the Place Order
                    button. The Customer must pay at the moment of the placement
                    of the order. Customers receive a confirmation of their
                    orders via email.
                  </p>

                  <h4 className="font-bold text-lg mb-2">Payment:</h4>
                  <p className="text-gray-700 mb-4">
                    The Customer may choose between the following payment
                    methods:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 mb-4">
                    <li>by PayPal</li>
                    <li>via Bancontact</li>
                    <li>
                      via Stripe or any other payment method proposed on the
                      Webstore.
                    </li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    The Seller is entitled to refuse an order pursuant to a
                    breach on the part of the Customer with respect to their
                    orders or in case of suspicion of fraud or for any other
                    valid reason whatsoever. If the Customer pays via bank
                    transfer, the Seller will start processing the order as from
                    the moment of receipt of the payment in full. If the Seller
                    does not receive full payment within 5 Business Days after
                    receipt of the order the Seller has the right to cancel the
                    order automatically.
                  </p>

                  <h4 className="font-bold text-lg mb-2">Order Received:</h4>
                  <p className="text-gray-700 mb-4">
                    Depending on the payment method, the Customer may be
                    notified when the transaction is authorised and in some
                    cases, processed. The status of the invoice is now “Paid”.
                  </p>

                  <h4 className="font-bold text-lg mb-2">Order Processing:</h4>
                  <p className="text-gray-700 mb-4">
                    After reception of the payment, the Order shall be processed
                    unless the Seller has to cancel the order for a valid reason
                    (out of stock, delivery problem, etc.)
                  </p>

                  <h4 className="font-bold text-lg mb-2">Order Shipped:</h4>
                  <p className="text-gray-700">
                    The Customer may choose a delivery method available on the
                    Webshop and the package shall be shipped in accordance with
                    clause 7 below.
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
                    {`Unless agreed otherwise, the delivery of the Good(s) occurs
                    at the showroom of the Seller located at Boulevard
                    Poincarré, 58B at B-1070 Anderlecht after notification from
                    the Seller that the Good(s) are ready for pick up.`}
                  </p>

                  <h4 className="font-bold text-lg mb-2">Delivery:</h4>
                  <p className="text-gray-700 mb-4">
                    {`The Seller undertakes to deliver the Good(s) within a period
                    of 30 days after receipt of the payment in full, unless
                    another delivery date is concluded between the Seller and
                    the Customer at the moment of formation of the Agreement.
                    International shipments can take up to 45 Business Days as
                    services can vary depending on the location of the Customer.
                    During busy periods such as Covid-19, Christmas and holidays
                    this timescale can double. The Seller cannot be held
                    responsible for these delays. All items are sent with a
                    ‘Track and Trace’ code which will be sent to the Customer in
                    an e-mail. The periods mentioned under this article are
                    therefore non-binding.`}
                  </p>

                  <p className="text-gray-700 mb-4">
                    {`In case the Seller is not able to deliver the Good(s) within
                    the period set out above, the Seller undertakes to inform
                    the Customer thereof in writing. The Customer has the right
                    to cancel the order in case of absence of shipping within a
                    90 Business Days period.`}
                  </p>

                  <p className="text-gray-700 mb-4">
                    The Customer will receive a confirmation via email as soon
                    as the order leaves the premises of the Seller. The Seller
                    shall deliver the order to the address provided by the
                    Customer to the Seller during the purchase process.
                  </p>

                  <p className="text-gray-700 mb-4">
                    In case there is no one available at the address of the
                    Customer at the moment of delivery, the Customer must follow
                    the instructions of the delivery service in charge of the
                    delivery of the order.
                  </p>

                  <p className="text-gray-700 mb-4">
                    {`The Seller reserves the right to make partial deliveries of
                    the ordered Good(s), for example, in case part of the order
                    is delayed or unavailable. In case of partial delivery, the
                    Seller will notify the Customer via email.`}
                  </p>

                  <p className="text-gray-700 mb-4">
                    {`The Customer must check the packaging upon
                    delivery/collection for possible damages. In case the
                    Good(s) are damaged, the Customer must not accept the
                    delivery and must notify the Seller immediately and maximum
                    within 48 hours. After notification, the Seller will provide
                    the Customer with the necessary instructions regarding the
                    damaged Good(s).`}
                  </p>

                  <p className="text-gray-700 mb-4">
                    {`Costs of shipment are always on expense of the Customer as
                    well as any import taxes and duties related to Customer’s
                    selected delivery country.`}
                  </p>

                  <h4 className="font-bold text-lg mb-2">Pick-up:</h4>
                  <p className="text-gray-700 mb-4">
                    If the Customer wants, he has the possibility during the
                    ordering process to choose for the pick-up at the studio if
                    possible. The Customer can choose this option in the
                    shipping options during checkout. The Customer needs to send
                    an email to the Seller so the Parties can set a date & hour
                    for pickup. The Customer can send this e-mail to
                    hey@frizbeeceramics.com
                  </p>

                  <p className="text-gray-700">
                    Any visible damage to and/or qualitative deficiencies of an
                    article or other deficiency in the delivery must be reported
                    within 48 hours after arrival by the Customer to Seller.
                  </p>

                  <p className="text-gray-700">
                    {`The risk due to loss or damage is transferred to the
                    Customer at the time the goods have been physically received
                    by the Customer (or a third party indicated by the Customer
                    that is not the carrier). However, the risk transfers to the
                    Customer upon delivery to the carrier when the carrier
                    received the commission to transport the goods and this
                    option was not offered by the Seller.`}
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
                    Right of Withdrawal
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4">
                    {`The provisions of this article apply solely to Customers in
                    their capacity as consumers purchasing articles online from
                    the Seller and only when the Good(s) purchased were not
                    manufactured according to the Customer’s specifications.`}
                  </p>

                  <p className="text-gray-700 mb-4">
                    In accordance with Article VI.47 of the Belgian Economic
                    Code, the Customer has the right to withdraw from this
                    Agreement within a period of 14 calendar days without giving
                    reasons. The right of withdrawal period will expire 14
                    calendar days after the date when the goods were physically
                    received by the Customer or a third party indicated by the
                    Customer that is not the carrier.
                  </p>

                  <p className="text-gray-700 mb-4">
                    {`To exercise the right of withdrawal, the Consumer must
                    inform the Seller by means of a clear statement (e.g., via a
                    registered letter or e-mail) of the Customer's decision to
                    withdraw from the Agreement. The Consumer can use the
                    attached sample withdrawal form for this purpose, but this
                    is not mandatory.`}
                  </p>

                  <p className="text-gray-700 italic mb-4">
                    Template of withdrawal form that can be used:
                  </p>
                  <p className="text-gray-700 italic mb-4">
                    {`To the attention of: [Seller's Contact Details]`}
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 mb-4 italic">
                    <li>
                      {`I/we (*) hereby notify you (*) of my/our (*) withdrawal
                      from the contract concluded by me/us (*) for the purchase
                      of the following goods (*)`}
                    </li>
                    <li>{`Ordered on (*) / received on (*)`}</li>
                    <li>{`Name of the consumer(s): (*)`}</li>
                    <li>{`Address of the consumer(s): (*)`}</li>
                    <li>{`Order number: (*)`}</li>
                    <li>
                      {`Signature of consumer(s): (*)(only if notified on paper)`}
                    </li>
                    <li>{`Date: (*)`}</li>
                    <li>{`(*) Delete as appropriate or complete.`}</li>
                  </ul>

                  <p className="text-gray-700 mb-4">
                    The Customer must send a notification of their decision to
                    exercise the right of withdrawal before the withdrawal
                    period has expired.
                  </p>

                  <p className="text-gray-700 mb-4">
                    {`The Customer has no later than 14 calendar days from the day
                    that they notify the Seller of their decision to withdraw
                    from the agreement to send back or hand over the goods to
                    the Seller [Seller's Address], Belgium. The Customer is on
                    time if they have sent back the Good(s) before the period of
                    14 calendar days has expired.`}
                  </p>

                  <p className="text-gray-700 mb-4">
                    The direct costs for returning the Goods shall be borne by
                    the Customer.
                  </p>

                  <p className="text-gray-700 mb-4">
                    {`In case of withdrawal, the Seller shall refund the amounts
                    already paid by the Customer for the Good(s), after receipt
                    of the Good(s). However, the Seller can reduce the refund to
                    reflect any reduction in the value of the Good(s), if this
                    has been caused by the Customer handling them in a way which
                    would not be permitted in a shop. The Seller shall make any
                    refund within a reasonable time after receipt of the Goods.
                    The Seller shall refund the Customer on the credit card or
                    debit card used by the Customer to pay.`}
                  </p>

                  <p className="text-gray-700 mb-4">
                    {`No refund will be granted to the Consumer after the legal
                    period of withdrawal. No refund will be given if the good is
                    not returned entirely and in the condition in which it was
                    sold and in its original package. No Goods that are returned
                    broken or damaged are accepted – please pack carefully.`}
                  </p>

                  <p className="text-gray-700">
                    The Customer may not exercise the right of withdrawal for:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 mb-4">
                    <li>
                      {`The delivery of goods manufactured according to the
                      Customer’s specifications or that are clearly destined for
                      a specific person.`}
                    </li>
                    <li>Items on sale.</li>
                    <li>
                      Any other exceptions under Article VI.47 of the Belgian
                      Economic Code.
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
                    The Customer must inform the Seller via email at
                    <a
                      href="mailto:hey@frizbeeceramics.com"
                      className="text-blue-600 underline"
                    >
                      hey@frizbeeceramics.com
                    </a>
                    of the defective Goods within a maximum period of one month
                    after the hidden defect becomes known or could have
                    reasonably become known to the Customer.
                  </p>

                  <p className="text-gray-700 mb-4">
                    {`In case a defect occurs within the legal warranty period of
                    2 years, the Customer must follow the procedure as set out
                    in clause 8. After the return of the defective Goods, the
                    Seller will, after establishing the defective character of
                    the said Goods, send the Customer a new Good(s) or repair
                    the Good(s) and will carry all the costs in relation to the
                    exchange/repair of the Good(s). The Good(s) can only be
                    replaced and delivered in so far as they are still
                    available/in stock. In case the reparation or replacement is
                    not possible or cannot be executed within a reasonable time,
                    the Customer has the right to terminate the Agreement and
                    the Seller will refund the price in accordance with clause
                    7.`}
                  </p>

                  <h4 className="font-bold text-lg mb-2">Exclusions:</h4>
                  <ul className="list-disc pl-5 text-gray-700 mb-4">
                    <li>Normal wear and tear of the Goods.</li>
                    <li>Accident, disaster or event of force majeure.</li>
                    <li>
                      {`Misuse of the Goods, fault or negligence (i.e.,
                      non-compliance with the instructions for use or normal use
                      for this type of Goods).`}
                    </li>
                    <li>Improper storage or handling of the Goods.</li>
                    <li>Any other valid and legal exclusion.</li>
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
                    Each Party can terminate the Agreement or suspend its own
                    obligations at any time with prior notice when the other
                    Party fails to fulfil one of its essential contractual
                    obligations or if it turns out that it will fail or if there
                    is a risk that he will fail to fulfil one of its
                    obligations, even if this happens before this obligation is
                    due to be fulfilled.
                  </p>

                  <p className="text-gray-700">
                    In addition, when the termination is due to the cause of the
                    Customer, the Seller will automatically be entitled to a
                    lump-sum compensation worth 30% of the cost of the work
                    still to be done by the Seller, without prejudice to any
                    damages and interest if the total value of the damage
                    actually suffered by the Seller turns out to be higher.
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
                    The Seller is not liable or responsible for any failure to
                    perform, or delay in performance of, any of its obligations
                    under the Agreement that is due to a situation of force
                    majeure.
                  </p>

                  <p className="text-gray-700">
                    In case of a situation of Force Majeure:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700 mb-4">
                    <li>The Seller shall inform the Customer thereof, and;</li>
                    <li>
                      {`The Seller’s obligations under the Agreement will be
                      suspended and the time for the performance of the
                      obligations will be extended for the duration of the
                      situation of Force Majeure. Where the situation of Force
                      Majeure affects the delivery of the Good(s), the Seller
                      will arrange a new delivery date with the Customer after
                      the situation of Force Majeure is over.`}
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
                    {`Models, drawings, logos, original works and shapes, logos
                    and any type of content present on the Webshop: The models,
                    drawings, trademarks, logos, texts, software, scripts,
                    graphics, photos, creations, sounds, music, as well as any
                    content of all kinds of the Webshop (graphic illustrations,
                    texts...) are protected by intellectual property rights and
                    mainly by copyright.`}
                  </p>

                  <p className="text-gray-700 mb-4">
                    The reproduction, communication, copying of these contents
                    or any other use, except for private use by the User,
                    requires prior written authorization from the Seller. In
                    this case, any use, especially for commercial or advertising
                    purposes, is forbidden without express written consent of
                    the Seller.
                  </p>

                  <p className="text-gray-700 mb-4">
                    {`The sale/purchase of the Good(s) does not imply any transfer
                    of these Intellectual Property Rights.`}
                  </p>

                  <p className="text-gray-700 mb-4">
                    {`In addition, Users are not allowed to systematically extract
                    and/or reuse parts of the content of the Webshop without the
                    express written permission of the Seller. In particular,
                    Users may not use a data mining robot, or any other similar
                    data collection or extraction tool to extract (in one or
                    more instances), to reuse a substantial part of any goods or
                    service on the Webshop, without the express written consent
                    of the Seller. Users are also not allowed to create and/or
                    publish their own databases that contain substantial parts
                    (e.g., our prices and product lists) of the Webshop and/or
                    the Goods without the express written consent of the Seller.`}
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
                    The Customer accepts that electronic communications and
                    backups might be used and serve as valid proof.
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
                    {`Without prejudice to any of the rights and remedies granted
                    to the Customer by the applicable law or these Terms and
                    Conditions B2C or in case of fraud or wilful misconduct, the
                    liability of the Seller for direct damages will always be
                    limited to the value of the ordered Goods. Any indirect
                    damage (damage to reputation, missing chance etc.) are
                    always excluded.`}
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
                    Invalid Clause
                  </h3>
                  <span
                    className={`mr-2 text-xl -mt-[3px] text-black font-extralight`}
                  >
                    {open ? "-" : "+"}
                  </span>
                </Disclosure.Button>
                <Disclosure.Panel className="text-sm font-extralight lg:text-lg tracking-tighter leading-snug md:leading-normal py-1 text-justify">
                  <p className="text-gray-700 mb-4 mt-2">
                    {`Should any provision of these Terms and Conditions B2C be or
                    become ineffective, or should one of the clause be
                    invalidated, then such shall be without prejudice to the
                    effectiveness of the remaining provisions. The Parties shall
                    be obligated to replace the ineffective provision with one
                    that most closely meets the ineffective provision’s economic
                    purpose.`}
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
                    The delivered items remain the exclusive property of the
                    Seller until full payment by the Customer. If necessary, the
                    Customer undertakes to inform third parties of the Seller's
                    retention of title, e.g., to anyone who would seize articles
                    that have not yet been paid in full.
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
                    {`The Seller only uses the Customer’s personal information in
                    accordance with the Privacy Policy on the Webshop.`}
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>

        {/* Law and Jurisdiction */}
        <div className="mb-20">
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
                    These Terms and Conditions B2C shall be governed by and
                    shall be construed in accordance with the law of Belgium.
                    Unless a mandatory provision under Belgian law states
                    otherwise, each party agrees to submit to the exclusive
                    jurisdiction of the French speaking courts of Brussels,
                    Belgium.
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
