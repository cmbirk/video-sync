import React from 'react'

const HomeCards = () =>
  (
  <section id="features" className="py-20 lg:pb-40 lg:pt-48">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl lg:text-5xl font-semibold">Main Features</h2>
      <div className="flex flex-col sm:flex-row sm:-mx-3 mt-12">
        <div className="flex-1 px-3">
          <Card className="mb-8">
            <p className="font-semibold text-xl">Service One</p>
            <p className="mt-4">
              An enim nullam tempor gravida donec enim ipsum blandit porta justo integer odio
              velna vitae auctor integer.
            </p>
          </Card>
        </div>
        <div className="flex-1 px-3">
          <Card className="mb-8">
            <p className="font-semibold text-xl">Service Two</p>
            <p className="mt-4">
              An enim nullam tempor gravida donec enim ipsum blandit porta justo integer odio
              velna vitae auctor integer.
            </p>
          </Card>
        </div>
        <div className="flex-1 px-3">
          <Card className="mb-8">
            <p className="font-semibold text-xl">Service Three</p>
            <p className="mt-4">
              An enim nullam tempor gravida donec enim ipsum blandit porta justo integer odio
              velna vitae auctor integer.
            </p>
          </Card>
        </div>
      </div>
    </div>
  </section>
  )

export default HomeCards
