import { AudioPlayer } from '@/components/core/AudioPlayer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { MicVocal } from 'lucide-react';
import { useState } from 'react';
import { set } from 'react-hook-form';

export const TriggerConversionButton = () => {
    const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
    const [showBusyGeneratingTopSkillsDiscussion, setShowBusyGeneratingTopSkillsDiscussion] = useState(false);

    return (
        <>
            <div className='flex flex-col items-center justify-center mt-4 relative border rounded-lg p-4'>
                <div className='absolute -top-3 right-3 md:right-1/4'>
                    <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-200 text-blue-800 animate-pulse'>
                        New
                    </span>
                </div>
                <div className='text-xs text-center mt-2'>Listen to Human Resources discuss your TopSkills</div>
                <Button className='w-full max-w-md mt-2' variant='outline' onClick={() => setShowLearnMoreModal(true)}>
                    Learn more
                </Button>
            </div>
            <Dialog open={showLearnMoreModal} onOpenChange={setShowLearnMoreModal}>
                <DialogContent className='px-4 max-w-[95%] sm:max-w-lg rounded-lg'>
                    <DialogTitle>Learn more about TopSkills</DialogTitle>
                    <DialogDescription>
                        <div className='text-xs'>
                            TopSkills are the skills that are most relevant to the job you are applying for. They are
                            extracted from your work experience and are used to generate a conversation that you can use
                            to prepare for interviews.
                        </div>
                        <div className='text-xs mt-2'>
                            You can listen to the conversation to get a feel for how others feel about your skills. This
                            can help you identify areas where you can improve and make your skills more relevant to the
                            job you are applying for.
                        </div>
                        <div className='text-xs mt-2'>
                            You are limited to 3 generations per day but you can listen as many times as you like.
                        </div>
                    </DialogDescription>

                    <div className='border border-gray-200 rounded-lg p-4 mt-4'>
                        <div className='text-xs'>Listen to a sample conversation to get an idea of what to expect</div>
                        <AudioPlayer
                            src='/audio/sample-topskills-discussion.mp3'
                            // src='https://api.cvbuilder.co.za/cvbuilder/getUserAudioUrl?fileName=topSkills-audio.mp3&action=get'
                            className='mt-4'
                        />
                    </div>

                    <div className='flex justify-end mt-4'>
                        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 h-full'>
                            <div className='flex flex-col items-center justify-center'>
                                <div className='flex items-center justify-end h-full space-x-4'>
                                    <Button variant='outline' onClick={() => setShowLearnMoreModal(false)}>
                                        Close
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setShowLearnMoreModal(false);
                                            setShowBusyGeneratingTopSkillsDiscussion(true);
                                        }}
                                    >
                                        Generate
                                        <MicVocal className='ml-2 h-5 w-5' />
                                    </Button>
                                </div>
                            </div>
                            <div className='text-xs my-3 text-center'>
                                <strong>Note:</strong> The conversation is generated using AI and may not be 100%
                                accurate.
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Dialog
                open={showBusyGeneratingTopSkillsDiscussion}
                onOpenChange={setShowBusyGeneratingTopSkillsDiscussion}
            >
                <DialogContent className='px-4 max-w-[95%] sm:max-w-lg rounded-lg'>
                    <DialogTitle>Generating TopSkills discussion</DialogTitle>
                    <DialogDescription>
                        <p className='text-xs'>
                            Please wait while we generate the discussion. This may take a few minutes (up to 5 minutes).
                        </p>
                        <p className='text-xs mt-2'>
                            You can wait here or you can close this dialog and return to the Topskills to listen later.
                        </p>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </>
    );
};
