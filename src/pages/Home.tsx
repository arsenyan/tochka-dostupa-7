import React from 'react'

import FormattedMessage from '../components/FormattedMessage'
import HorizontalShowcase from '../components/HorizontalShowcase'
import SpektCard from '../components/Views/Cards/SpektCard'
import Link from '../components/Link'
import { Context } from '../components/Store'
import {
  Sponsor,
  SponsorType,
} from '../components/Store/Types'
import FestivalPass from '../components/FestivalPass'
import Subscribe from '../components/Subscribe'
import Img from '../components/Img'


class Home extends React.Component<{}, {}> {

  static contextType = Context

  render = () => {
    const page = this?.context?.contentful?.homepages?.[0]

    return !page ? '' :
      <div className="Home">
        <div className="Home__cover" />

        <div className="container mb-s mb-md-l">        
          <div className="row mb-s">
            <div className='col-4 col-md-6 col-lg-10'>
              <div className='p p--xxl'>
                {page.shortDesc}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-4 col-md-3 col-xl-2">
              <Link
                to='/festival/about'
                className="button--secondary mb-3 mb-md-0"
              >
                <FormattedMessage id='Festival.pages.About.name'/>
              </Link>
            </div>
            <div className="col-4 col-md-3 col-xl-2">          
              <Link
                to='/festival/archive'
                className="button--secondary"
              >
                <FormattedMessage id='Festival.pages.Archive.name'/>
              </Link>
            </div>
          </div>
        </div>
        <HorizontalShowcase
          className='HorizontalShowcase--Home'
          L
          arrows
          title={
            <>
              <FormattedMessage id={`Program.pages.Main.name`} /> <FormattedMessage id='Program.name' />
            </>
          }
          ItemComp={SpektCard}
          items={page.main}
          bottomLink={{
            to: 'program/main',
            label: <FormattedMessage id='Program.full' />
          }}
        />
        {page.showFestivalPass &&
          <FestivalPass />
        }
        <HorizontalShowcase
          className='HorizontalShowcase--Home'
          M
          arrows
          title={
            <>
              <FormattedMessage id={`Program.pages.Open.name`} /> <FormattedMessage id='Program.name' />
            </>
          }
          ItemComp={SpektCard}
          items={page.open}
          bottomLink={{
            to: 'program/open',
            label: <FormattedMessage id='Program.full' />
          }}
        />
        <HorizontalShowcase
          className='HorizontalShowcase--Home pb-m pb-md-l pb-lg-xl'
          S
          arrows
          title={
            <>
              <FormattedMessage id={`Program.pages.Educational.name`} /> <FormattedMessage id='Program.name' />
            </>
          }
          ItemComp={SpektCard}
          items={page.educational}
          bottomLink={{
            to: 'program/educational',
            label: <FormattedMessage id='Program.full' />
          }}
        />
        {page.showSubscribe &&
          <Subscribe />
        }

        <div className='container'>
          <div className='row mb-0 mb-md-3 mb-lg-0'>
            <div className='col'>
              <h2 className='h2 h2--underline'>
                {page.partnersTitle}
              </h2>
            </div>
          </div>

          {page
            ?.sponsorsTypes?.map((sponsorType: SponsorType, index: number) =>
              <React.Fragment key={sponsorType.name}>
                <div className='row mb-xxs mb-md-s mb-lg-xs'>
                  <div className='col'>
                    <h2 className='p p--xxl'>
                      {sponsorType.name}
                    </h2>
                  </div>
                </div>
                <div className='row mb-xxs mb-md-s mb-lg-m'>
                  {sponsorType?.sponsors
                    ?.map((partner: Sponsor) =>
                      <div
                        key={partner.id}
                        className={index === 0 ? 'col-4 col-md-3' : 'col-2 col-md-2 col-lg-2'}
                      >
                        <Img
                          file={partner.logo[0]}
                          className='w-100'
                          noCrop
                        />
                      </div>
                  )}
                </div>
              </React.Fragment>
          )}

        </div>
        
      </div>
  }
}


export default Home