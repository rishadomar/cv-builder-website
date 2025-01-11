import React from 'react';
import { Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className='bg-gray-100 mt-20'>
            <div className='max-w-7xl mx-auto px-4 py-12'>
                {/* Main footer content */}
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                    {/* Company Info */}
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold text-gray-900'>Company</h3>
                        <ul className='space-y-2'>
                            <li>
                                <a href='/about-us' className='text-gray-600 hover:text-gray-900'>
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href='/contact-us' className='text-gray-600 hover:text-gray-900'>
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href='/careers' className='text-gray-600 hover:text-gray-900'>
                                    Careers
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold text-gray-900'>Resources</h3>
                        <ul className='space-y-2'>
                            <li>
                                <a href='/blog' className='text-gray-600 hover:text-gray-900'>
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href='/faqs' className='text-gray-600 hover:text-gray-900'>
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href='/support' className='text-gray-600 hover:text-gray-900'>
                                    Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold text-gray-900'>Legal</h3>
                        <ul className='space-y-2'>
                            <li>
                                <a href='/privacy' className='text-gray-600 hover:text-gray-900'>
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href='/terms' className='text-gray-600 hover:text-gray-900'>
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href='/cookie-policy' className='text-gray-600 hover:text-gray-900'>
                                    Cookie Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className='space-y-4'>
                        <h3 className='text-lg font-semibold text-gray-900'>Connect</h3>
                        <div className='flex space-x-4'>
                            {/* <a href='#' className='text-gray-600 hover:text-gray-900'>
                                <Github className='w-6 h-6' />
                            </a>
                            <a href='#' className='text-gray-600 hover:text-gray-900'>
                                <Twitter className='w-6 h-6' />
                            </a> */}
                            <a
                                href='https://www.linkedin.com/in/rishad-omar/'
                                className='text-gray-600 hover:text-gray-900'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <Linkedin className='w-6 h-6' />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className='border-t border-gray-200 mt-12 pt-8'>
                    <p className='text-gray-500 text-sm text-center'>
                        © {new Date().getFullYear()} CV Builder. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
